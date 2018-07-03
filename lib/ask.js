const inquirer = require('inquirer')

async function ask (prompts, data) {
  for (let key in prompts) {
    await prompt(data, key, prompts[key])
  }
}

async function prompt (data, key, prompt) {
  if (prompt.when && !data[prompt.when]) {
    return
  }
  const answers = await inquirer.prompt([{
    type: prompt.type,
    name: prompt.name,
    default: prompt.default,
    message: prompt.message,
    choices: prompt.choices
  }])
  data[key] = answers[key]
}

module.exports = ask
