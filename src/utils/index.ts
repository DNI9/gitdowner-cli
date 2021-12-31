import axios from 'axios'

// Turns normal github url to api url for request
export const getUrl = (url: string) => {
  const [username, repo, , , ...path] = url
    .replace('https://github.com/', '')
    .split('/')

  let apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/`
  if (url.endsWith('/')) path.pop()
  apiUrl += `${path.join('/')}`
  if (!path.length) throw new Error('Link must contain a specific directory')
  return apiUrl
}

export const downloader = (urls: string[]) =>
  Promise.allSettled(urls.map(u => axios.get(u, {responseType: 'blob'})))

export * from './file'
