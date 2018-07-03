const Metalsmith = require('metalsmith')
const path = require('path')
const render = require('consolidate').ejs.render
const minimatch = require('minimatch')
const options = require('./options')
const ask = require('./ask')

function generate (name, src, dest) {
  const opts = options(name, src)
  return new Promise((resolve, reject) => {
    Metalsmith(path.join(src, 'template'))
      .metadata({})
      .source('.')
      .destination(dest)
      .use(askQuestions(opts.prompts))
      .use(clean(opts.filters))
      .use(template)
      .build((err) => {
        if (err) {
          reject(err)
        }
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

function clean (filters) {
  return function (files, metalsmith, done) {
    const keys = Object.keys(files)
    const metadata = metalsmith.metadata()

    Object.keys(filters).forEach(function (glob) {
      keys.forEach(file => {
        if (minimatch(file, glob, { dot: true })) {
          if (!metadata.lint) {
            delete files[file]
          }
        }
      })
    })

    keys.forEach(file => {
      if (minimatch(file, `view/*.*`)) {
        if (!minimatch(file, `view/*.${metadata.view}`)) {
          delete files[file]
        }
      }
    })
    done()
  }
}

function askQuestions (prompts) {
  return async function (files, metalsmith, done) {
    const metadata = metalsmith.metadata()
    await ask(prompts, metadata)
    await done()
  }
}

module.exports = generate
