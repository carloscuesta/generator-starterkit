'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;


/* baseFiles: files created by default */

describe('starterkit', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({
                skipInstall: true
            })
            .on('end', done);
    });

    it('creates base expected files', function() {
        assert.file([
            'package.json',
            '.editorconfig',
            '.jshintrc',
            'README.md',
            'gulpfile.js',
            '.gitignore'
        ]);
    });
});

/* scss: files created by choosing the scss option */

describe('starterkit:scss', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                cssPrepro: 'scss'
            })
            .on('end', done);
    });

    it('creates expected scss files', function() {
        assert.file([
            'src/styles/style.scss',
            'src/styles/_includes/_vars.scss'
        ]);
    });
});

/* less: files created by choosing the less option */

describe('starterkit:less', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                cssPrepro: 'less'
            })
            .on('end', done);
    });

    it('creates expected less files', function() {
        assert.file([
            'src/styles/style.less',
            'src/styles/_includes/_vars.less'
        ]);
    });
});

/* jade: files created by choosing the jade option */

describe('starterkit:jade', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                templateLang: 'jade'
            })
            .on('end', done);
    });

    it('creates expected jade files', function() {
        assert.file([
            'src/templates/index.jade',
            'src/templates/_includes/_content.jade',
            'src/templates/_includes/_head.jade',
            'src/templates/_includes/_header.jade'
        ]);
    });
});

/* html: files created by choosing the html option */

describe('starterkit:html', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                templateLang: 'html'
            })
            .on('end', done);
    });

    it('creates expected html files', function() {
        assert.file([
            'src/templates/index.html'
        ]);
    });
});
