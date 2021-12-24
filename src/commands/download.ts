import {Arguments, CommandBuilder} from 'yargs'
import {handleDownload} from '../services/downloader'

type Options = {
  url: string
}

export const command = 'download <url>'
export const desc = 'Download directory from github to current directory'
export const aliases: Array<string> = ['d']

export const builder: CommandBuilder<Options, Options> = yargs =>
  yargs
    .positional('url', {type: 'string', demandOption: true})
    .check((argv, _options) => {
      const {url} = argv
      if (!url.startsWith('https://github.com/'))
        throw new Error('URL must be a valid github url')

      return argv
    })

export const handler = async (argv: Arguments<Options>) => {
  const {url} = argv
  await handleDownload(url)
  process.exit(0)
}
