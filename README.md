# koa2-starter-cli

> Koa2 application generator.


## Features

- Custom template engine (e.g. pug, nunjucks, ejs).

- Use ESLint to lint your code, and custom ESLint preset (e.g. Airbnb, Standard).

- Routing with koa-router.

- Parsing request with koa-body.

- nodemon for development to auto-restart when your files change.

- formatted Commit message with commitizen.

more detail see: [koa2-starter](https://github.com/liuxing/koa2-starter)


## Installation

```bash
$ npm install -g koa-starter
```

## Usage

```bash
$ koa2 init <project-name>
```

The above command pulls the template from [koa2-starter](https://github.com/liuxing/koa2-starter), prompts for some information, and generates the project at `<project-name>`

Example:

```bash
$ koa2 init my-koa
```

```bash
$ cd my-koa
$ git init # Some package needs Git. Of course, you may not need it.
$ npm install
$ npm run dev
```

![koa-cli](https://i.loli.net/2018/07/03/5b3b44fc73fd1.png)



## License

[MIT](https://github.com/liuxing/koa2-starter-cli/blob/master/LICENSE) @ Liu Xing
