# generator-starterkit 

[![Build Status](https://img.shields.io/travis/carloscuesta/generator-starterkit.svg?style=flat-square)](https://travis-ci.org/carloscuesta/generator-starterkit)
[![Dependency Status](http://img.shields.io/david/carloscuesta/generator-starterkit.svg?style=flat-square)](https://david-dm.org/carloscuesta/generator-starterkit)
[![npm version](https://img.shields.io/npm/v/generator-starterkit.svg?style=flat-square)](https://www.npmjs.com/package/generator-starterkit)
[![npm-downloads](https://img.shields.io/npm/dt/generator-starterkit.svg?style=flat-square)](http://npmjs.com/package/generator-starterkit)


![yeoman-starterkit](https://cloud.githubusercontent.com/assets/7629661/11163398/ca52709c-8acd-11e5-88da-8256ab5b6fa0.png)

> Yeoman generator that scaffolds out a front end development [starterkit](https://github.com/carloscuesta/starterkit).

## Technologies

- [**Gulp**](http://gulpjs.com): Automate and enhance your workflow.
- CSS Preprocessors
    - [**Sass**](http://sass-lang.com): CSS with superpowers.
    - [**Less**](http://lesscss.org): Less extends CSS with dynamic behavior.
- Templating / Markup
    - [**Jade**](http://jade-lang.com): Templating engine.
    - [**Html**](https://developer.mozilla.org/es/docs/Web/HTML)
- JavaScript
	- [**JSCS**](http://jscs.info): Code style linter for programmatically enforcing your style guide. 
	- [**Babel**](https://babeljs.io): Use next generation JavaScript, today.
	- [**Npm**](https://www.npmjs.com): Package manager used to install dependencies and everything you need.

## Features

- ```styles``` [Sass](http://sass-lang.com) / [Less](http://lesscss.org) auto compiling, prefixing, minifiying and sourcemapping.
- ```templates```: [Jade](http://jade-lang.com) / Html auto compiling and minifiying.
- ```scripts```: Scripts concatenation, transpiling with [Babel](https://babeljs.io), minifiying and sourcemapping.
- ```lint```: Lint your JavaScript files using [JSCS](http://jshint.com/about).
- ```images```: Images optimization.
- ```deploy```: Deploying your project into a ftp server.
- ```beautify```: Beautify preproduction files.
- ```browsersync```: Automatically injects all your changes in ```styles```, ```templates``` and ```scripts``` into your browser and other devices on save.
- ```optimize```: Automatically autoptimize your project using [critical](https://github.com/addyosmani/critical) and [uncss](https://github.com/giakki/uncss). To improve your page speed.

For more information about gulp workflow / tasks go to [starterkit gulp tasks](https://github.com/carloscuesta/starterkit#tasks)

## Requirements and Use

### Requirements

- [NodeJS](https://nodejs.org/en/)
- [Yeoman](http://yeoman.io)
- [Generator-Starterkit](https://github.com/carloscuesta/generator-starterkit)

```bash
$ npm install -g yo
$ npm install -g generator-starterkit
```

### Use

Before running the generator you will need to **create a folder** for your project where the generator will create all the project files and directories.

Once you have, **NodeJS**, **Yeoman**, **generator-starterkit** installed and your project folder created you can run the generator using:

```bash
$ mkdir project
$ cd project
$ yo starterkit
$ gulp
```

Now the [generator-starterkit](https://github.com/carloscuesta/generator-starterkit) will start to ask some questions to setup the project for you; project information, technologies and languages that you want to use and will install the dependencies automatically based on your decisions.

Also there are a lot of files being created dynamically such as gulp.js, package.json, readme.md, styles and templates to match the technologies and options that you choose from the generator. (See the [technologies available](https://github.com/carloscuesta/generator-starterkit#technologies))

**Don't forget to run ```gulp``` after the yeoman finishes.** Also you can use **```npm run```** to list the gulp tasks available and running them using for example ```npm run dev```, (dev will run the default gulp task).

## Options

- ```--skip-install```: Skips the installation of dependencies with npm.
- ```--skip-welcome-message```: Skips the welcome message.
- ```--skip-install-message```: Skips the message after the installation of dependencies.
- ```--skip-cache```: Do not remember prompt answers.

## Project Structure

```
.
├── /dist/                   # Minified, optimized and compiled files.
│   ├── /assets/             # Assets folder.
│   │   ├── /css/            # CSS style files.
│   │   ├── /files/          # Static files.
│   │   │   └── img/         # Images folder.
│   │   └── /js/             # JS files.
│   └── *.html               # Minified HTML files.
├── /node_modules/           # Node modules dependencies and packages.
├── /src/                    # Source files.
│   ├── /images/             # Images non compressed.
│   ├── /scripts/            # JavaScript files.
│   ├── /styles/             # SCSS / Less style files.
│   │   └── _includes/       # Styles SCSS / Less partials.
│   ├── /templates/          # Templating Jade files / Html files.
│   │   └── _includes/       # Templating Jade partials.
└── gulpfile.js              # Gulp automatization file.
```

## Demo

![yostarterkit](https://cloud.githubusercontent.com/assets/7629661/10416911/2c8d9600-702b-11e5-9724-087666e1c81b.gif)

## License

The code is available under the [MIT](https://github.com/carloscuesta/generator-starterkit/blob/master/LICENSE) license.
