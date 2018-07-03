#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const fs = require('fs')
const os = require('os')
const inquirer = require('inquirer')
const rm = require('rimraf').sync
const chalk = require('chalk')
const download = require('../lib/download')
const generate = require('../lib/generate')
const logger = require('../lib/logger')

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
      rm(to)
      await downloadAndGenerate(target, to)
    }
    return
  }
  await downloadAndGenerate(target, to)
}

async function downloadAndGenerate (name, to) {
  rm(tmp)
  await download(repo, tmp)
  await generate(name, tmp, to)
  logger.log(`
# Project initialization finished!
# ========================

To get started:
  ${chalk.yellow(`cd ${name}`)}
  ${chalk.yellow('git init')} (husky needs Git)
  ${chalk.yellow('npm run dev')}
  `)
}
