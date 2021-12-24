import axios from 'axios'
import fs, {promises as asyncfs} from 'fs'
import ora from 'ora'
import {GitResponseType} from '../types'

const createDir = (path: string) =>
  !fs.existsSync(path) && fs.mkdirSync(path, {recursive: true})

const getUrl = (url: string) => {
  const [username, repo, , , ...path] = url
    .replace('https://github.com/', '')
    .split('/')

  let apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/`
  if (url.endsWith('/')) path.pop()
  apiUrl += `${path.join('/')}`
  if (!path.length) throw new Error('Link must contain a specific directory')
  return apiUrl
}

const spinner = ora({interval: 150})

const makeRequest = async (url: string, dir: string) => {
  createDir(dir)
  const {data} = await axios.get<GitResponseType[]>(url)
  for (const e of data) {
    if (e.type === 'dir') {
      const newDir = dir + '/' + e.name
      await makeRequest(e.url, newDir)
    } else {
      const file = dir + '/' + e.name
      spinner.text = `Downloading ${file}`
      const {data} = await axios.get(e.download_url, {responseType: 'blob'})
      await asyncfs.writeFile(
        file,
        typeof data === 'object' ? JSON.stringify(data, null, 2) : data,
      )
    }
  }
}

export const handleDownload = async (input: string) => {
  const url = getUrl(input)
  const baseDir = url.substring(url.lastIndexOf('/') + 1)
  spinner.start('Getting information...')
  await makeRequest(url, baseDir)
  spinner.succeed('Downloaded successfully')
}
