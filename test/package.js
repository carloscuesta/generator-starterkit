'use strict';

var path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

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
            'gulp-cssnano',
            'gulp-uncss',
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

	describe('when using ftp deploy', function () {
    	before(function(done) {
        	helpers.run(path.join(__dirname, '../generators/app'))
        	    .inDir(path.join(__dirname, './.tmp'))
        	    .withOptions({
        	        skipInstall: true
        	    })
        	    .withPrompts({
        	        deployMethod: 'ftp'
        	    })
        	    .on('end', done);
    	});

        it('should contain additional dependencies', function() {
            [
                'vinyl-ftp',
            ].forEach(function(dependency) {
                assert.fileContent('package.json', dependency);
            });
        });
    });

	describe('when using github pages deploy', function () {
    	before(function(done) {
        	helpers.run(path.join(__dirname, '../generators/app'))
        	    .inDir(path.join(__dirname, './.tmp'))
        	    .withOptions({
        	        skipInstall: true
        	    })
        	    .withPrompts({
        	        deployMethod: 'gh-pages'
        	    })
        	    .on('end', done);
    	});

        it('should contain additional dependencies', function() {
            [
                'gulp-gh-pages',
            ].forEach(function(dependency) {
                assert.fileContent('package.json', dependency);
            });
        });
    });
});
