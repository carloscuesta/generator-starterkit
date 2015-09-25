'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;

describe('starterkit:jade', function() {
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

    /* jade: files created by choosing the jade option */

    it('creates expected jade files', function() {
        assert.file([
            'src/templates/index.jade',
            'src/templates/_includes/_content.jade',
            'src/templates/_includes/_head.jade',
            'src/templates/_includes/_header.jade'
        ]);
    });
});

describe('starterkit:jade:dependencies', function() {

    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, './.tmp'))
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                templateLang: 'jade'
            })
            .on('end', done);
    });

    it('should contain necessary jade dependencies', function() {
        [
            'gulp-jade'
        ].forEach(function(dependency) {
            assert.fileContent('package.json', dependency);
        });
    });
});
