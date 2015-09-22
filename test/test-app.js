'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;

describe('main', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                someOption: true
            })
            .on('end', done);
    });

    it('creates expected files', function() {
        assert.file([
            'package.json',
            '.editorconfig',
            '.jshintrc',
            'README.md',
            'gulpfile.js',
            'src/scripts/index.js'
            /*'src/styles/style.scss'
            'dist/assets/files/images/',
            'dist/assets/js',
            'src/images/',
            'src/scripts',
            'src/styles/',
            'src/styles/_includes/',
            'src/templates/',
            'src/templates/_includes/' */
        ]);
    });
});
