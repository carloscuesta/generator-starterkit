'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;

describe('starterkit:package-dependencies', function() {

    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, './.tmp'))
            .withOptions({
                skipInstall: true
            })
            .on('end', done);
    });

    it('should contain necessary dependencies', function() {
        [
            'browser-sync',
            'gulp',
            'gulp-autoprefixer',
            'gulp-beautify',
            'gulp-concat',
            'gulp-cssimport',
            'gulp-imagemin',
            'gulp-notify',
            'gulp-plumber',
            'gulp-rename',
            'gulp-uglify',
            'gulp-minify-css',
            'gulp-uncss',
            'vinyl-ftp',
            'gulp-sourcemaps',
            'critical'
        ].forEach(function(dependency) {
            assert.fileContent('package.json', dependency);
        });
    });

    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, './.tmp'))
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                useBabel: true
            })
            .on('end', done);
    });

    it('should contain additional dependencies', function() {
        [
            'gulp-babel'
        ].forEach(function(dependency) {
            assert.fileContent('package.json', dependency);
        });
    });
});
