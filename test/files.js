'use strict';

var path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

/* baseFiles: files created by default */

describe('starterkit:files', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app/index.es6.js'))
            .withOptions({
                skipInstall: true
            })
            .on('end', done);
    });

    it('creates default files', function() {
        assert.file([
            'package.json',
            '.editorconfig',
            'README.md',
            'gulpfile.js',
            '.gitignore'
        ]);
    });

    describe('when using jscs', function () {
    	before(function(done) {
        	helpers.run(path.join(__dirname, '../generators/app/index.es6.js'))
        	    .inDir(path.join(__dirname, './.tmp'))
        	    .withOptions({
        	        skipInstall: true
        	    })
        	    .withPrompts({
        	        jsLinter: 'jscs'
        	    })
        	    .on('end', done);
    	});

    	it('creates config files', function() {
        	assert.file([
            	'.jscsrc'
        	]);
    	});
    });

    describe('when using jshint', function () {
    	before(function(done) {
        	helpers.run(path.join(__dirname, '../generators/app/index.es6.js'))
        	    .inDir(path.join(__dirname, './.tmp'))
        	    .withOptions({
        	        skipInstall: true
        	    })
        	    .withPrompts({
        	        jsLinter: 'jshint'
        	    })
        	    .on('end', done);
    	});

    	it('creates config files', function() {
        	assert.file([
            	'.jshintrc'
        	]);
    	});
    });
});
