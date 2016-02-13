'use strict';

var path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test');

describe('starterkit:templating', function() {

	describe('when using jade', function () {
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

		it('creates expected files', function() {
        	assert.file([
        	    'src/templates/index.jade',
        	    'src/templates/_includes/_content.jade',
        	    'src/templates/_includes/_head.jade',
        	    'src/templates/_includes/_header.jade'
        	]);
    	});

    	it('should contain necessary dependencies', function() {
    	    [ 'gulp-jade'].forEach(function(dependency) {
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
