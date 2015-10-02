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
        if (this.templateLang==='jade') {
            mkdirp(srcDir + '/templates/_includes/');
        }
    },

    _projectFiles: function() {
        var projectInfo = {
            appname: this.appname,
            appversion: this.appversion,
            appdescription: this.appdescription,
            applicense: this.applicense,
            appauthor: this.appauthor,
            appemail: this.appemail
        };

        this.fs.copy(
            this.templatePath('editorconfig'),
            this.destinationPath('.editorconfig')
        );

        this.fs.copy(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore')
        );

        this.fs.copy(
            this.templatePath('jshintrc'),
            this.destinationPath('.jshintrc')
        );

        this.fs.copyTpl(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js'),
            {
                templateLang: this.templateLang,
                cssPrepro: this.cssPrepro,
                useBabel: this.useBabel,
                ftpHost: this.ftpHost,
                ftpUser: this.ftpUser,
                ftpPassword: this.ftpPassword,
                ftpDeployDir: this.ftpDeployDir,
            }
        );

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            {
                appname: this.appname,
                appdescription: this.appdescription,
                applicense: this.applicense,
                appauthor: this.appauthor,
                appemail: this.appemail,
                useBabel: this.useBabel,
                templateLang: this.templateLang,
                cssPrepro: this.cssPrepro,
                useFlexboxgrid: this.useFlexboxgrid,
                useBootstrap: this.useBootstrap
            }
        );

        this.fs.copyTpl(
            this.templatePath('_readme.md'),
            this.destinationPath('README.md'),
            {
                appname: this.appname,
                appversion: this.appversion,
                appdescription: this.appdescription,
                applicense: this.applicense,
                appauthor: this.appauthor,
                appemail: this.appemail,
                useBabel: this.useBabel,
                templateLang: this.templateLang,
                cssPrepro: this.cssPrepro
            }
        );

        this.fs.copy(
            this.templatePath('styles/'+this.cssPrepro+'/_includes/_*.'+this.cssPrepro),
            this.destinationPath('src/styles/_includes')
        );

        this.fs.copyTpl(
            this.templatePath('styles/'+this.cssPrepro+'/*.'+this.cssPrepro),
            this.destinationPath('src/styles'),
            {
                useFlexboxgrid: this.useFlexboxgrid
            }
        );

        this.fs.copy(
            this.templatePath('scripts/*.js'),
            this.destinationPath('src/scripts/')
        );

        switch(this.templateLang) {
            case 'jade':
                this.fs.copyTpl(
                    this.templatePath('templating/jade/*.jade'),
                    this.destinationPath('src/templates/'),
                    projectInfo
                );

                this.fs.copyTpl(
                    this.templatePath('templating/jade/_includes/_*.jade'),
                    this.destinationPath('src/templates/_includes/'),
                    {
                        appname: this.appname,
                        appdescription: this.appdescription,
                        applicense: this.applicense,
                        appauthor: this.appauthor,
                        appemail: this.appemail,
                        useBabel: this.useBabel,
                        templateLang: this.templateLang,
                        cssPrepro: this.cssPrepro,
                        useFlexboxgrid: this.useFlexboxgrid,
                        useBootstrap: this.useBootstrap
                    }
                );
            break;

            case 'html':
                this.fs.copyTpl(
                    this.templatePath('templating/html/*.html'),
                    this.destinationPath('src/templates/'),
                    {
                        appname: this.appname,
                        appdescription: this.appdescription,
                        applicense: this.applicense,
                        appauthor: this.appauthor,
                        appemail: this.appemail,
                        useBabel: this.useBabel,
                        templateLang: this.templateLang,
                        cssPrepro: this.cssPrepro,
                        useFlexboxgrid: this.useFlexboxgrid,
                        useBootstrap: this.useBootstrap
                    }
                );
            break;
        }

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
                message: 'Enter a the description for your project',
                validate: function(value) {
                    if (value!=='') {
                        return true;
                    } else {
                        return chalk.red('Enter a description, description can\'t be empty!');
                    }
                }
            },
            {
                name: 'license',
                message: 'How is your project licensed',
                default: 'MIT'
            },
            {
                name: 'author',
                message: 'What is your name',
                validate: function(value) {
                    if (value!=='') {
                        return true;
                    } else {
                        return chalk.red('Enter your name, name can\'t be empty.');
                    }
                }
            },
            {
                name: 'email',
                message: 'What is your email address',
                validate: function(value) {
                    var validEmail = value.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
                    if (validEmail) {
                        return true;
                    } else {
                        return chalk.red('Please enter a valid email address');
                    }
                }
            },
            {
                type: 'list',
                name: 'templateLang',
                message: 'Choose a '+chalk.green('templating or markup language'),
                choices: [{
                    name: 'Jade',
                    value: 'jade'
                }, {
                    name: 'Html',
                    value: 'html'
                }]
            },
            {
                type: 'list',
                name: 'cssPrepro',
                message: 'Choose a '+chalk.magenta('CSS preprocessor'),
                choices: [{
                    name: 'Sass',
                    value: 'scss'
                }, {
                    name: 'Less',
                    value: 'less'
                }]
            },
            {
                type: 'confirm',
                name: 'useBabel',
                message: 'Would you like to use '+chalk.yellow('Babel'),
                default: true
            },
            {
                type: 'checkbox',
                name: 'additionalPackages',
                message: 'Would you like to use some of these packages / frameworks:',
                choices: [
                    {
                        name: 'Flexboxgrid',
                        value: 'useFlexboxgrid',
                        checked: true
                    },
                    {
                        name: 'Bootstrap',
                        value: 'useBootstrap'
                    }
                ]
            },
            {
                type: 'confirm',
                name: 'setupFTP',
                message: 'Would you like to setup your '+chalk.blue('FTP')+' to use the deploy task'
            },
            {
                type: 'input',
                name: 'ftpHost',
                message: 'Please enter your '+chalk.blue('ftp host:'),
                when: function (answers) {
                    return answers.setupFTP;
                },
                validate: function(value) {
                    if (value!=='') {
                        return true;
                    } else {
                        return chalk.red('The FTP host can\'t be empty!');
                    }
                }
            },
            {
                type: 'input',
                name: 'ftpUser',
                message: 'Please enter your '+chalk.blue('ftp user:'),
                when: function (answers) {
                    return answers.setupFTP;
                },
                validate: function(value) {
                    if (value!=='') {
                        return true;
                    } else {
                        return chalk.red('The FTP user can\'t be empty!');
                    }
                }
            },
            {
                type: 'password',
                name: 'ftpPassword',
                message: 'Please enter your '+chalk.blue('ftp password'),
                when: function (answers) {
                    return answers.setupFTP;
                },
                validate: function(value) {
                    if (value!=='') {
                        return true;
                    } else {
                        return chalk.red('The FTP password can\'t be empty!');
                    }
                }
            },
            {
                type: 'input',
                name: 'ftpDeployDir',
                message: 'Please enter the '+chalk.blue('ftp directory')+' where the deploy will go:',
                when: function (answers) {
                    return answers.setupFTP;
                },
                validate: function(value) {
                    if (value!=='') {
                        return true;
                    } else {
                        return chalk.red('The FTP remote directory can\'t be empty!');
                    }
                }
            }
        ];
        return answers;
    },

    _getAnswers: function(answers, callback) {
        function hasAdditionalPackages (pkg) {
            return answers.additionalPackages && answers.additionalPackages.indexOf(pkg) !== -1;
        }
        this.appname = answers.name;
        this.appdescription = answers.description;
        this.appversion = answers.version;
        this.applicense = answers.license;
        this.appauthor = answers.author;
        this.appemail = answers.email;
        this.templateLang = answers.templateLang;
        this.cssPrepro = answers.cssPrepro;
        this.useBabel = answers.useBabel;
        this.setupFTP = answers.setupFTP;
        this.ftpHost = answers.ftpHost;
        this.ftpUser = answers.ftpUser;
        this.ftpPassword = answers.ftpPassword;
        this.ftpDeployDir = answers.ftpDeployDir;
        this.useFlexboxgrid = hasAdditionalPackages('useFlexboxgrid');
        this.useBootstrap = hasAdditionalPackages('useBootstrap');
        callback();
    },

    constructor: function() {
        yeoman.Base.apply(this, arguments);

        this.option('skip-welcome-message', {
            desc: 'Skips the welcome message',
            type: Boolean,
            defaults: false
        });

        this.option('skip-install-message', {
            desc: 'Skips the message after the installation of dependencies',
            type: Boolean,
            default: false
        });

        this.option('skip-install', {
            desc: 'Skips the installation of the dependencies',
            type: Boolean,
            default: false
        });
    },

    initializing: function() {
        var greeting = 'Welcome to the ' + chalk.red.bold('starterkit') + '!' + ' A solid ' + chalk.blue('webkit') + ' to develop '+chalk.yellow('front end')+' static projects';

        if (!this.options['skip-welcome-message']){
            this.log(yosay(greeting, {
                maxLength: 26
            }));
        }
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
        this.installDependencies({
            bower: false,
            skipInstall: this.options['skip-install'],
            skipMessage: this.options['skip-install-message'],
            callback: function() {
                this._end();
                this.log('Run'+chalk.red(' gulp ')+'to start coding!\n');
            }.bind(this)
        });
    },

    _end: function() {
        var goodBye = '\nYo! It\'s done have a great day :) '+chalk.bold.red('starterkit ')+'finished!\n';
        if (!this.options['skip-welcome-message']){
            this.log(goodBye);
        }
    }
});
