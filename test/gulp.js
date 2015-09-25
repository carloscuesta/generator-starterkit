'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;

describe('starterkit:gulp-tasks', function() {

    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, './.tmp'))
            .withOptions({
                skipInstall: true
            })
            .on('end', done);
    });

    it('should contain necessary tasks', function() {
        [
            'styles',
            'templates',
            'scripts',
            'images',
            'deploy',
            'beautify',
            'browser-sync',
            'build',
            'default',
        ].forEach(function(task) {
            assert.fileContent('gulpfile.js', 'gulp.task(\'' + task);
        });
    });
});

describe('starterkit:gulp:packages', function() {

    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, './.tmp'))
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                cssPrepro: 'sass',
                useBabel: true,
                templateLang: 'jade'
            })
            .on('end', done);
    });

    it('should contain necessary gulp packages', function() {
        [
            'gulp-sass',
            'gulp-babel',
            'gulp-jade'
        ].forEach(function(pkg) {
            assert.fileContent('gulpfile.js', pkg);
        });
    });
});

describe('starterkit:gulp:packages', function() {

    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, './.tmp'))
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                cssPrepro: 'less',
                useBabel: false,
                templateLang: 'html'
            })
            .on('end', done);
    });

    it('should contain necessary gulp packages', function() {
        [
            'gulp-less',
            'gulp-minify-html',
        ].forEach(function(pkg) {
            assert.fileContent('gulpfile.js', pkg);
        });
    });
});
