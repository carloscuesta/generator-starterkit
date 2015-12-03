'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;

describe('starterkit:package.json', function() {

    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, './.tmp'))
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                useBabel: true,
                jsLinter: 'jscs'
            })
            .on('end', done);
    });

    it('should contain default dependencies', function() {
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

    it('should contain additional dependencies', function() {
        [
            'gulp-babel',
            'gulp-jscs'
        ].forEach(function(dependency) {
            assert.fileContent('package.json', dependency);
        });
    });
});
