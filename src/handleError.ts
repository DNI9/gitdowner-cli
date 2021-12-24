import axios, {AxiosError} from 'axios'
import chalk from 'chalk'
import {EOL} from 'os'

const printMessage = (message: string) => {
  process.stderr.write(chalk.red(`\nError: ${message}`) + EOL)
  process.stderr.write(
    `Hint: Use the ${chalk.green(
      '--help',
    )} option to get help about the usage` + EOL,
  )
}

export default async (message: string, error: Error): Promise<never> => {
  if (message) {
    printMessage(message)
    process.exit(1)
  }

  let errorMessage = error.message ?? 'Unknown error occurred'

  if (axios.isAxiosError(error)) {
    const axiosError: AxiosError = error
    errorMessage =
      'An error occurred while fetching data ' +
      'Response:' +
      axiosError.message
  }

  printMessage(errorMessage)
  process.exit(1)
}
