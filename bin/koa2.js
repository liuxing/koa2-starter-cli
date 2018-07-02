#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const fs = require('fs')
const os = require('os')
const inquirer = require('inquirer')
const download = require('../lib/download')
const ask = require('../lib/ask')
const generate = require('../lib/generate')

const tmp = path.join(os.homedir(), '.koa2-starter/template')
const repo = 'github:liuxing/koa2-starter#template'

program
  .version(require('../package.json').version)
  .usage('<command> [options]')

program
  .command('init')
  .description('generate a new project from a template')
  .action(init)

program.parse(process.argv)

if (process.argv.length === 2) {
  program.outputHelp()
}

async function init (target) {
  if (typeof target === 'object') {
    target = '.'
  }
  let inPlace = target === '.'
  const to = path.resolve(target)
  if (fs.existsSync(to)) {
    const answers = await inquirer.prompt([{
      type: 'confirm',
      message: inPlace
        ? 'Generate project in current directory?'
        : 'Target directory exists. Continue?',
      name: 'ok'
    }])
    if (answers.ok) {
      const answers = await ask()
      await download(repo, tmp)
      await generate(answers, tmp, to)
    }
    return
  }
  const answers = await ask()
  await download(repo, tmp)
  await generate(answers, tmp, to)
}
