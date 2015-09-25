'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;

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

    /* scss: files created by choosing the scss option */

    it('creates expected scss files', function() {
        assert.file([
            'src/styles/style.scss',
            'src/styles/_includes/_vars.scss'
        ]);
    });
});

describe('starterkit:scss:dependencies', function() {

    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, './.tmp'))
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                cssPrepro: 'scss'
            })
            .on('end', done);
    });

    it('should contain necessary scss dependencies', function() {
        [
            'gulp-cssimport',
            'gulp-sass'
        ].forEach(function(dependency) {
            assert.fileContent('package.json', dependency);
        });
    });
});
