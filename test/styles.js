'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;

describe('starterkit:styles', function() {

	describe('when using scss', function () {
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

    	it('creates expected files', function() {
    	    assert.file([
    	        'src/styles/style.scss',
    	        'src/styles/_includes/_vars.scss'
    	    ]);
    	});

    	it('should contain necessary dependencies', function() {
    	    [
    	        'gulp-cssimport',
    	        'gulp-sass'
    	    ].forEach(function(dependency) {
    	        assert.fileContent('package.json', dependency);
    	    });
    	});
    });

    describe('when using less', function () {
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

    	it('creates expected files', function() {
    	    assert.file([
    	        'src/styles/style.less',
    	        'src/styles/_includes/_vars.less'
    	    ]);
    	});

    	it('should contain necessary dependencies', function() {
    	    [
    	        'gulp-less',
    	        'gulp-minify-css'
    	    ].forEach(function(dependency) {
    	        assert.fileContent('package.json', dependency);
    	    });
    	});
    });
});
