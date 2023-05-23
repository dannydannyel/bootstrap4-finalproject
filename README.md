# bootstrap4-finalproject

This course is the last assignment from `Front-end Web UI Framweroks and tools: Bootstrap 4` from **Coursera**

## 1. Introduction

The main purpose of the web is to offer a very useful library for store pogramming cheatsheet very useful for programmers, downloadable or displayable online in pdf or image format for instance. This app offers:
* Navigate through programming languages (i.e. php, java, python)
* Search by topic (i.e. "python tkinter")
* Navigate through topics (i.e. web framework, file accessing, database connection)
* The webapp includes login capabilites to use as cloud services to add cheat sheet favorites, and so on.
* Vote system to can order the cheat sheets by its relevance
* Suggestions for add new cheat sheets after administrator validation

## 2. Design and implementation

* Initialized the npm repository with `npm init` and default settings, except the starting point as `index.html` file
* Installed `lite-server` package, modified package.json and started with npm run serve
* I've installed as course tells the bootstrap npm package to use the bootstrap capabilites by using in local instead CDN by using `npm install --save-dev bootstrap@4.6.0` command
* Created the first `index.html` file by adding the node_modules mandatory css and js bootstrap files and tested with lite-server in realtime
	- Next, added several bootstrap 4 components and layout applying for main page: Jumbotron, media object and simple navbar
* Added the next html file from a copy of index.html called `toprated.html` that uses commmon parts as navbar, link for css and js, and footer. The rest of the main part is new, including bootstrap card components for express the top rated cheatsheets with a sample of 6 cards.
* Installed several packages for sass compiler and parallel execution for use scss compiler in watch mode and lite-server execution at same time, using the `package.json` script configuration.
	- Added `scss` (standalon scss compiler), `watch:scss` (scss compiler with `watch` flag), `watch:all` (`parallelshell` for watch:scss and lite-server) and finally `start` (to call directly `npm run watch:all`)
	- The package `parallelshell` has an issue that must be solved by editing the `index.js` original in `node_modules/parallelshell` folder due to my recent node and npm versions, due is incompatible, see references to more information. This is solved by replacing the original `index.js` and then it worked
* After several tests I've realized that current usemin-cli version for use htmlmin, uglify-js and cssmin didn't work due uglify-js has an icompatibility with my current nodejs version. So I investigated and I discovered webpack npm package. But it didn't work too.
* Finally I've used with **gult**, but I had to investigate on internet due the current gult version has several incompatibilites, like using the `series` method for task.

## 3. Conclusions

* I had too many problems with compatibilities by using npm packages due the course has several years and my node version has too many changes to can follow the course instructions, so it has been very complicated to me to do all the taks. Finally, I've decided to focus on the web creation and leave the rest of the tasks of `dist/` creation less done, due is very bored for me.
    
## 4. References

* [Npm cli scripts section](https://docs.npmjs.com/cli/v9/using-npm/scripts)
* [Npm run-script command](https://docs.npmjs.com/cli/v9/commands/npm-run-script)
* [Npm start command](https://docs.npmjs.com/cli/v9/commands/npm-start)
* [lite-server](https://www.npmjs.com/package/lite-server)
* [boostrap npm package](https://getbootstrap.com/docs/4.6/getting-started/download/#npm)
* [Issue on executing parallelshell npm package](https://github.com/darkguy2008/parallelshell/issues/69)