export interface GitResponseType {
  name: string
  path: string
  size: number
  url: string
  download_url: string
  type: string
}

export type FileData = {
  path: string
  data: string
}
