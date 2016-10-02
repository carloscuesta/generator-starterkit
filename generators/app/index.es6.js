import {  Base } from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';
import mkdirp from 'mkdirp';

class Starterkit extends Base {

    constructor(...args) {
        super(...args);

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
    }

    _projectStructure() {
        const destRoot = this.destinationRoot();
        const distDir = `${destRoot}/dist/`;
        const srcDir = `${destRoot}/src/`;
        const assetsDir = `${distDir}/assets/`;

        mkdirp(distDir);
        mkdirp(`${assetsDir}/css`);
        mkdirp(`${assetsDir}/js`);
        mkdirp(`${assetsDir}/files/img`);

        mkdirp(srcDir);
        mkdirp(`${srcDir}/images`);
        mkdirp(`${srcDir}/scripts`);
        mkdirp(`${srcDir}/styles/_includes/`);
        if (this.templateLang === 'pug') {
            mkdirp(`${srcDir}/templates/_includes/`);
        }
    }

    _projectFiles() {
        const projectInfo = {
            appname: this.appname,
            appdescription: this.appdescription,
            applicense: this.applicense,
            appauthor: this.appauthor,
            appemail: this.appemail,
            useBabel: this.useBabel,
            jsLinter: this.jsLinter,
            templateLang: this.templateLang,
            cssPrepro: this.cssPrepro,
            useFlexboxgrid: this.useFlexboxgrid,
            useBootstrap: this.useBootstrap,
            deployMethod: this.deployMethod
        };

        this.fs.copy(
            this.templatePath('editorconfig'),
            this.destinationPath('.editorconfig')
        );

        this.fs.copy(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore')
        );

        switch (this.jsLinter) {
            case 'jscs':
                this.fs.copy(
                    this.templatePath('jscsrc'),
                    this.destinationPath('.jscsrc')
                );
                break;

            case 'jshint':
                this.fs.copy(
                    this.templatePath('jshintrc'),
                    this.destinationPath('.jshintrc')
                );
                break;
        }

        this.fs.copyTpl(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js'), {
                appname: this.appname,
                templateLang: this.templateLang,
                cssPrepro: this.cssPrepro,
                useBabel: this.useBabel,
                useJSLint: this.useJSLint,
                jsLinter: this.jsLinter,
                ftpHost: this.ftpHost,
                ftpUser: this.ftpUser,
                ftpPassword: this.ftpPassword,
                ftpDeployDir: this.ftpDeployDir,
                deployMethod: this.deployMethod
            }
        );

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'), {
                appname: this.appname,
                appdescription: this.appdescription,
                applicense: this.applicense,
                appauthor: this.appauthor,
                appemail: this.appemail,
                useBabel: this.useBabel,
                jsLinter: this.jsLinter,
                templateLang: this.templateLang,
                cssPrepro: this.cssPrepro,
                useFlexboxgrid: this.useFlexboxgrid,
                useBootstrap: this.useBootstrap,
                deployMethod: this.deployMethod
            }
        );

        this.fs.copyTpl(
            this.templatePath('_readme.md'),
            this.destinationPath('README.md'), {
                appname: this.appname,
                appversion: this.appversion,
                appdescription: this.appdescription,
                applicense: this.applicense,
                appauthor: this.appauthor,
                appemail: this.appemail,
                useBabel: this.useBabel,
                jsLinter: this.jsLinter,
                templateLang: this.templateLang,
                cssPrepro: this.cssPrepro
            }
        );

        this.fs.copy(
            this.templatePath(`styles/${this.cssPrepro}/_includes/_*.${this.cssPrepro}`),
            this.destinationPath('src/styles/_includes')
        );

        this.fs.copyTpl(
            this.templatePath(`styles/${this.cssPrepro}/*.${this.cssPrepro}`),
            this.destinationPath('src/styles'), {
                useFlexboxgrid: this.useFlexboxgrid,
                useBootstrap: this.useBootstrap
            }
        );

        this.fs.copy(
            this.templatePath('scripts/*.js'),
            this.destinationPath('src/scripts/')
        );

        switch (this.templateLang) {
            case 'pug':
                this.fs.copyTpl(
                    this.templatePath('templating/pug/*.pug'),
                    this.destinationPath('src/templates/'),
                    projectInfo
                );

                this.fs.copyTpl(
                    this.templatePath('templating/pug/_includes/_*.pug'),
                    this.destinationPath('src/templates/_includes/'),
                    projectInfo
                );
                break;

            case 'html':
                this.fs.copyTpl(
                    this.templatePath('templating/html/*.html'),
                    this.destinationPath('src/templates/'),
                    projectInfo
                );
                break;
        }

    }

    _askUser() {
        const answers = [{
            name: 'name',
            message: 'What is the name of your project',
            default: this.appname
        }, {
            name: 'description',
            message: 'Enter a the description for your project',
            validate(value) {
                if (value !== '') {
                    return true;
                } else {
                    return chalk.red('Enter a description, description can\'t be empty!');
                }
            }
        }, {
            name: 'license',
            message: 'How is your project licensed',
            default: 'MIT'
        }, {
            name: 'author',
            message: 'What is your name',
            validate(value) {
                if (value !== '') {
                    return true;
                } else {
                    return chalk.red('Enter your name, name can\'t be empty.');
                }
            }
        }, {
            name: 'email',
            message: 'What is your email address',
            validate(value) {
                const validEmail = value.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
                if (validEmail) {
                    return true;
                } else {
                    return chalk.red('Please enter a valid email address');
                }
            }
        }, {
            type: 'list',
            name: 'templateLang',
            message: `Choose a ${chalk.green('templating or markup language')}`,
            choices: [{
                name: 'Pug',
                value: 'pug'
            }, {
                name: 'Html',
                value: 'html'
            }]
        }, {
            type: 'list',
            name: 'cssPrepro',
            message: `Choose a ${chalk.magenta('CSS preprocessor')}`,
            choices: [{
                name: 'Sass',
                value: 'scss'
            }, {
                name: 'Less',
                value: 'less'
            }]
        }, {
            type: 'confirm',
            name: 'useBabel',
            message: `Would you like to use ${chalk.yellow('Babel')}`,
            default: true
        }, {
            type: 'confirm',
            name: 'useJSLint',
            message: `Would you like to use a ${chalk.yellow('JS Linter')}`
        }, {
            type: 'list',
            name: 'jsLinter',
            message: `Choose a ${chalk.yellow('JSLinter')}`,
            choices: [{
                name: 'JSCS',
                value: 'jscs'
            }, {
                name: 'JSHint',
                value: 'jshint'
            }],
            when(answers) {
                return answers.useJSLint;
            }
        }, {
            type: 'checkbox',
            name: 'additionalPackages',
            message: 'Would you like to use some of these packages / frameworks:',
            choices: [{
                name: 'Flexboxgrid',
                value: 'useFlexboxgrid',
                checked: true
            }, {
                name: 'Bootstrap',
                value: 'useBootstrap'
            }]
        }, {
            type: 'confirm',
            name: 'setupDeploy',
            message: `Would you like to set up a ${chalk.blue('deploy method')}`
        }, {
            type: 'list',
            name: 'deployMethod',
            message: `Choose a ${chalk.blue('deploy method')}`,
            choices: [{
                name: 'GitHub Pages',
                value: 'gh-pages'
            }, {
                name: 'FTP',
                value: 'ftp'
            }, {
                name: 'Surge',
                value: 'surge'
            }],
            when(answers) {
                return answers.setupDeploy;
            }
        }, {
            type: 'input',
            name: 'ftpHost',
            message: `Please enter your ${chalk.blue('ftp host:')}`,
            when(answers) {
                return answers.deployMethod === 'ftp';
            },
            validate(value) {
                if (value !== '') {
                    return true;
                } else {
                    return chalk.red('The FTP host can\'t be empty!');
                }
            }
        }, {
            type: 'input',
            name: 'ftpUser',
            message: `Please enter your ${chalk.blue('ftp user:')}`,
            when(answers) {
                return answers.deployMethod === 'ftp';
            },
            validate(value) {
                if (value !== '') {
                    return true;
                } else {
                    return chalk.red('The FTP user can\'t be empty!');
                }
            }
        }, {
            type: 'password',
            name: 'ftpPassword',
            message: `Please enter your ${chalk.blue('ftp password')}`,
            when(answers) {
                return answers.deployMethod === 'ftp';
            },
            validate(value) {
                if (value !== '') {
                    return true;
                } else {
                    return chalk.red('The FTP password can\'t be empty!');
                }
            }
        }, {
            type: 'input',
            name: 'ftpDeployDir',
            message: `Please enter the ${chalk.blue('ftp directory')} where the deploy will go:`,
            when(answers) {
                return answers.setupDeploy === 'ftp';
            },
            validate(value) {
                if (value !== '') {
                    return true;
                } else {
                    return chalk.red('The FTP remote directory can\'t be empty!');
                }
            }
        }];
        return answers;
    }

    _getAnswers(answers, callback) {
        function hasAdditionalPackages(pkg) {
            return answers.additionalPackages && answers.additionalPackages.includes(pkg);
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
        this.jsLinter = answers.jsLinter;
        this.useJSLint = answers.useJSLint;
        this.deployMethod = answers.deployMethod;
        this.setupFTP = answers.setupFTP;
        this.ftpHost = answers.ftpHost;
        this.ftpUser = answers.ftpUser;
        this.ftpPassword = answers.ftpPassword;
        this.ftpDeployDir = answers.ftpDeployDir;
        this.useFlexboxgrid = hasAdditionalPackages('useFlexboxgrid');
        this.useBootstrap = hasAdditionalPackages('useBootstrap');
        callback();
    }


    prompting() {
        const greeting = `Welcome to the ${chalk.red.bold('starterkit')}! A solid ${chalk.blue('webkit')} to develop ${chalk.yellow('front end')} static projects`;

        if (!this.options['skip-welcome-message']) {
            this.log(yosay(greeting, {
                maxLength: 26
            }));
        }
        const done = this.async();

        this.prompt(this._askUser()).then(answers => {
            this._getAnswers(answers, done);
            done();
        });
    }

    writing() {
        this._projectStructure();
        this._projectFiles();
    }

    install() {
        this.installDependencies({
            bower: false,
            skipInstall: this.options['skip-install'],
            skipMessage: this.options['skip-install-message'],
            callback: () => {
                this._end();
                this.log(`Run${chalk.red(' gulp ')}to start coding!\n`);
            }
        });
    }

    _end() {
        const goodBye = `\nYo! It's done have a great day :) ${chalk.bold.red('starterkit ')}finished!\n`;
        if (!this.options['skip-welcome-message']) {
            this.log(goodBye);
        }
    }
}

module.exports = Starterkit;
