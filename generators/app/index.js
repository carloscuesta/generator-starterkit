'use strict';
var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
    prompting: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the fabulous ' + chalk.red('Starterkit') + ' generator!'
        ));

        var prompts = [{
            name: 'projectName',
            message: 'What do you want to call your project?'
        }];

        this.prompt(prompts, function(props) {
            this.projectName = props.projectName;
            console.log(this.projectName);
            done();
        }.bind(this));
    },

    writing: {
        directories: function() {
            mkdirp('dist/assets/css');
            mkdirp('dist/assets/files/img/');
            mkdirp('dist/assets/js/');
            mkdirp('src/images/');
            mkdirp('src/scripts/');
            mkdirp('src/styles/_includes/');
            mkdirp('src/templates/_includes/');
        },

        app: function() {
            this.fs.copy(
                this.templatePath('_package.json'),
                this.destinationPath('package.json')
            );

            this.fs.copy(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json')
            );
        },

        projectfiles: function() {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );

            this.fs.copy(
                this.templatePath('jshintrc'),
                this.destinationPath('.jshintrc')
            );

            this.fs.copy(
                this.templatePath('gulpfile.js'),
                this.destinationPath('gulpfile.js')
            );
        }
    },


    install: function() {
        this.installDependencies();
    }
});
