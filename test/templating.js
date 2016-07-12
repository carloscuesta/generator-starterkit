'use strict';

var path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('starterkit:templating', function() {

	describe('when using pug', function () {
		before(function(done) {
        	helpers.run(path.join(__dirname, '../generators/app'))
        	    .withOptions({
        	        skipInstall: true
        	    })
        	    .withPrompts({
        	        templateLang: 'pug'
        	    })
        	    .on('end', done);
    	});

		it('creates expected files', function() {
        	assert.file([
        	    'src/templates/index.pug',
        	    'src/templates/_includes/_content.pug',
        	    'src/templates/_includes/_head.pug',
        	    'src/templates/_includes/_header.pug'
        	]);
    	});

    	it('should contain necessary dependencies', function() {
    	    [ 'gulp-pug'].forEach(function(dependency) {
    	        assert.fileContent('package.json', dependency);
    	    });
    	});
    });

    describe('when using html', function () {
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

    	it('creates expected files', function() {
    	    assert.file([
    	        'src/templates/index.html'
    	    ]);
    	});

    	it('should contain necessary dependencies', function() {
    	    ['gulp-htmlmin'].forEach(function(dependency) {
    	        assert.fileContent('package.json', dependency);
    	    });
    	});
    });
});
