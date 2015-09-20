'use strict';
var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({

    _projectStructure: function() {
        var destRoot = this.destinationRoot(),
            distDir = destRoot + '/dist/',
            srcDir = destRoot + '/src/',
            assetsDir = distDir + '/assets/';

        mkdirp(distDir);
        mkdirp(assetsDir + '/css');
        mkdirp(assetsDir + '/js');
        mkdirp(assetsDir + '/files/images');

        mkdirp(srcDir);
        mkdirp(srcDir + '/images');
        mkdirp(srcDir + '/scripts');
        mkdirp(srcDir + '/styles/_includes/');
        mkdirp(srcDir + '/templates/_includes/');
    },

    _projectFiles: function() {
        var templateCtx = {
            appname: this.appname,
            appversion: this.appversion,
            appdescription: this.appdescription,
            applicense: this.applicense,
            appauthor: this.appauthor,
            appemail: this.appemail,
            includeFlexboxgrid: this.includeFlexboxgrid,
            cssPrepro: this.cssPrepro,
            errorMessage:'<%= error.message %>'
        };

        this.fs.copy(
            this.templatePath('editorconfig'),
            this.destinationPath('.editorconfig')
        );

        this.fs.copy(
            this.templatePath('jshintrc'),
            this.destinationPath('.jshintrc')
        );

        this.fs.copyTpl(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js'),
            templateCtx
        );

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            templateCtx
        );

        this.fs.copyTpl(
            this.templatePath('_bower.json'),
            this.destinationPath('bower.json'),
            templateCtx
        );

        this.fs.copyTpl(
            this.templatePath('_readme.md'),
            this.destinationPath('README.md'),
            templateCtx
        );
    },

    _askUser: function() {
        var answers = [
            {
                name: 'name',
                message: 'What is the name of your project',
                default: this.appname
            },
            {
                name: 'description',
                message: 'What is the description of your project'
            },
            {
                name: 'version',
                message: 'What is the version of your project',
                default: '0.0.0'
            },
            {
                name: 'license',
                message: 'How is your project licensed',
                default: 'MIT'
            },
            {
                name: 'author',
                message: 'What is your name'
            },
            {
                name: 'email',
                message: 'What is your email address'
            },
            {
                type: 'confirm',
                name: 'includeFlexboxgrid',
                message: 'Would you like to use Flexboxgrid',
                default: true,
            },
            {
                type: 'list',
                name: 'cssPrepro',
                message: 'Choose a CSS preprocessor',
                choices: [{
                    name: 'Sass',
                    value: 'sass'
                }, {
                    name: 'Less',
                    value: 'less'
                }]
            }
        ];
        return answers;
    },

    _getAnswers: function(answers, callback) {
        this.appname = answers.name;
        this.appdescription = answers.description;
        this.appversion = answers.version;
        this.applicense = answers.license;
        this.appauthor = answers.author;
        this.appemail = answers.email;
        this.includeFlexboxgrid = answers.includeFlexboxgrid;
        this.cssPrepro = answers.cssPrepro;
        callback();
    },

    initializing: function() {
        var greeting = 'Welcome to the ' + chalk.red.bold('starterkit') + '!' + ' A solid ' + chalk.blue('webkit') + ' to develop at the' + chalk.yellow(' front end');

        this.log(yosay(greeting, {
            maxLength: 26
        }));
    },

    prompting: function() {
        var done = this.async();

        this.prompt(this._askUser(), function(answers) {
            this._getAnswers(answers, done);
            done();
        }.bind(this));
    },

    writing: function() {
        this._projectStructure();
        this._projectFiles();
    },

    install: function() {
    //    this.installDependencies();
    }
});
