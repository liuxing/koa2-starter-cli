const inquirer = require('inquirer')

function ask () {
  return inquirer.prompt([
    {
      type: 'string',
      name: 'name',
      required: true,
      message: 'Project name'
    },
    {
      type: 'string',
      name: 'description',
      message: 'Project description',
      default: 'A Koa2 project'
    },
    {
      type: 'string',
      name: 'author',
      message: 'Author'
    },
    {
      type: 'list',
      name: 'view',
      choices: [
        'nunjucks',
        'ejs',
        'pug'
      ]
    },
    {
      type: 'confirm',
      name: 'lint',
      message: 'Use ESLint to lint your code?'
    },
    {
      name: 'lintConfig',
      type: 'list',
      message: 'Pick an ESLint preset',
      choices: [
        {
          name: 'Standard (https://github.com/standard/standard)',
          value: 'standard',
          short: 'Standard'
        },
        {
          name: 'Airbnb (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'Airbnb'
        }
      ]
    }
  ])
}

module.exports = ask
