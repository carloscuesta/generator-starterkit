'use strict';

var path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('starterkit:gulp', function() {

    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, './.tmp'))
            .withOptions({
                skipInstall: true
            })
            .on('end', done);
    });

    it('should contain default tasks', function() {
        [
            'styles',
            'templates',
            'scripts',
            'images',
            'ftp',
            'beautify',
            'serve',
            'uncss',
            'critical',
            'optimize',
            'build',
            'dev',
            'deploy',
            'default',
        ].forEach(function(task) {
            assert.fileContent('gulpfile.js', 'gulp.task(\'' + task);
        });
    });

    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, './.tmp'))
            .withOptions({
                skipInstall: true
            })
            .on('end', done);
    });

    it('should contain default requires/imports', function() {
        [
            'gulp',
            'gulp-concat',
            'browser-sync',
            'gulp-plumber',
            'gulp-notify',
            'gulp-imagemin',
            'gulp-rename',
            'gulp-autoprefixer',
            'gulp-uglify',
            'vinyl-ftp',
            'gulp-beautify',
            'gulp-uncss',
            'gulp-cssnano',
            'gulp-beautify',
            'gulp-sourcemaps',
            'critical'
        ].forEach(function(pkg) {
            assert.fileContent('gulpfile.js', pkg);
        });
    });

    describe('when using sass, babel, pug and jscs', function () {
    	before(function(done) {
        	helpers.run(path.join(__dirname, '../generators/app'))
        	    .inDir(path.join(__dirname, './.tmp'))
        	    .withOptions({
        	        skipInstall: true
        	    })
        	    .withPrompts({
        	        cssPrepro: 'sass',
        	        useBabel: true,
        	        templateLang: 'pug',
        	        jsLinter: 'jscs'
        	    })
        	    .on('end', done);
    	});

    	it('should contain additional packages', function() {
    	    [
    	        'gulp-sass',
    	        'gulp-babel',
    	        'gulp-pug',
    	        'gulp-jscs'
    	    ].forEach(function(pkg) {
    	        assert.fileContent('gulpfile.js', pkg);
    	    });
    	});

    	it('should contain lint task', function() {
        	['lint'].forEach(function(task) {
            	assert.fileContent('gulpfile.js', 'gulp.task(\'' + task);
        	});
    	});

    	it('should contain route paths', function() {
    	    [
    	        '_scss',
    	        'css',
    	        '_pug'
    	    ].forEach(function(pkg) {
    	        assert.fileContent('gulpfile.js', pkg);
    	    });
    	});
    });

    describe('when using less, html and jshint', function () {
    	before(function(done) {
        	helpers.run(path.join(__dirname, '../generators/app'))
        	    .inDir(path.join(__dirname, './.tmp'))
        	    .withOptions({
        	        skipInstall: true
        	    })
        	    .withPrompts({
        	        cssPrepro: 'less',
        	        templateLang: 'html',
        	        jsLinter: 'jshint'
        	    })
        	    .on('end', done);
    	});

    	it('should contain additional packages', function() {
    	    [
    	        'gulp-less',
    	        'gulp-htmlmin',
    	        'gulp-jshint'
    	    ].forEach(function(pkg) {
    	        assert.fileContent('gulpfile.js', pkg);
    	    });
    	});

    	it('should contain route paths', function() {
    	    [
    	        '_less',
    	        'html'
    	    ].forEach(function(pkg) {
    	        assert.fileContent('gulpfile.js', pkg);
    	    });
    	});
    });
});
