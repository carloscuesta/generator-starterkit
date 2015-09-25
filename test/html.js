'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;

describe('starterkit:html', function() {
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

    /* html: files created by choosing the html option */

    it('creates expected html files', function() {
        assert.file([
            'src/templates/index.html'
        ]);
    });
});

describe('starterkit:html:dependencies', function() {

    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, './.tmp'))
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                templateLang: 'html'
            })
            .on('end', done);
    });

    it('should contain necessary html dependencies', function() {
        [
            'gulp-minify-html'
        ].forEach(function(dependency) {
            assert.fileContent('package.json', dependency);
        });
    });
});
