const download = require('download-git-repo')
const ora = require('ora')
const logger = require('./logger')

module.exports = function (repo, path) {
  const spinner = ora('downloading template')
  spinner.start()
  return new Promise((resolve, reject) => {
    download(repo, path, { clone: true }, (err) => {
      spinner.stop()
      if (err) {
        reject(err)
        logger.error(`Failed to download repo ${repo}: ${err.message.trim()}`)
      } else {
        resolve(path)
        logger.success('Generated success')
      }
    })
  })
}
