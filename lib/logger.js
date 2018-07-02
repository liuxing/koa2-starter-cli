const chalk = require('chalk')

const prefix = '  koa2-starter'
const sep = chalk.gray('·')

exports.log = function (msg) {
  console.log(chalk.white(prefix), sep, msg)
}

exports.success = function (msg) {
  console.log(chalk.white(prefix), sep, msg)
}

exports.error = function (msg) {
  console.log(chalk.red(prefix), sep, msg)
  process.exit(1)
}
