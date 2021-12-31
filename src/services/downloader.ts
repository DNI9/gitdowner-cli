import axios from 'axios'
import ora from 'ora'
import {FileData, GitResponseType} from '../types'
import {createDir, downloader, fileWriter, getUrl} from '../utils'

const spinner = ora({interval: 150})

const makeRequest = async (url: string, baseDir: string) => {
  createDir(baseDir)
  const {data} = await axios.get<GitResponseType[]>(url)
  const files = data.filter(e => e.type === 'file')
  const dirs = data.filter(e => e.type === 'dir')

  if (files.length) {
    spinner.text = `Downloading ${baseDir}...`
    const fileUrls = files.map(e => e.download_url)
    const res = await downloader(fileUrls)

    const fileData: FileData[] = []
    for (const r of res) {
      if (r.status === 'fulfilled') {
        fileData.push({
          path: baseDir + '/' + r.value.config?.url?.split('/').pop(),
          data: r.value.data,
        })
      }
    }
    if (fileData.length) await fileWriter(fileData)
  }

  for (const e of dirs) await makeRequest(e.url, baseDir + '/' + e.name)
}

export const handleDownload = async (input: string) => {
  const url = getUrl(input)
  const baseDir = url.substring(url.lastIndexOf('/') + 1)
  spinner.start('Getting information...')
  await makeRequest(url, baseDir)
  spinner.succeed('Downloaded successfully')
}
