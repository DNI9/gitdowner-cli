import fs, {promises as asyncfs} from 'fs'
import {FileData} from '../types'

export const createDir = (path: string) =>
  !fs.existsSync(path) && fs.mkdirSync(path, {recursive: true})

export const fileWriter = (files: FileData[]) => {
  return Promise.allSettled(
    files.map(f =>
      asyncfs.writeFile(
        f.path,
        typeof f.data === 'object' ? JSON.stringify(f.data, null, 2) : f.data,
      ),
    ),
  )
}
