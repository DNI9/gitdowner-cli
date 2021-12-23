#!/usr/bin/env node

import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'
import handleError from './handleError'

yargs(hideBin(process.argv))
  // Use the commands directory to scaffold.
  .commandDir('commands')
  // Default command if none supplied - shows help.
  .command(
    '$0',
    'gitloader usage',
    () => undefined,
    () => {
      yargs.showHelp()
    },
  )
  .command(
    'completion',
    'generates completion script for zsh/bash',
    () => undefined,
    () => {
      yargs.showCompletionScript()
    },
  )
  // Enable strict mode.
  .strict()
  // Useful aliases.
  .alias({h: 'help'})
  .alias({v: 'version'})
  .epilogue('More info at: https://github.com/DNI9/gitloader-cli/')
  .fail(handleError).argv
