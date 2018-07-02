const Metalsmith = require('metalsmith')
const path = require('path')
const render = require('consolidate').ejs.render
const rm = require('rimraf').sync
const minimatch = require('minimatch')

function generate (metadata = {}, src, dest) {
  return new Promise((resolve, reject) => {
    Metalsmith(path.join(__dirname))
      .metadata(metadata)
      .source(src)
      .destination(dest)
      .use(template)
      .use(clean)
      .build((err) => {
        if (err) {
          reject(err)
        }
        rm(src)
        resolve()
      })
  })
}

function template (files, metalsmith, done) {
  const keys = Object.keys(files)
  const metadata = metalsmith.metadata()
  keys.forEach(file => {
    const str = files[file].contents.toString()
    render(str, metadata, (err, res) => {
      if (err) return done(err)
      files[file].contents = Buffer.from(res)
      done()
    })
  })
}

function clean (files, metalsmith, done) {
  const keys = Object.keys(files)
  const metadata = metalsmith.metadata()
  keys.forEach(file => {
    if (minimatch(file, `view/*.*`)) {
      if (!minimatch(file, `view/*.${metadata.view}`)) {
        delete files[file]
      }
    }
  })
  done()
}

module.exports = generate
// (async () => {
//   await generate({
//     name: 'test',
//     description: 'test',
//     author: 'test',
//     lintConfig: 'airbnb',
//     view: 'pug'
//   }, '../template', '../dist')
// })()
