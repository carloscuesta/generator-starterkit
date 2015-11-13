'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;

/* baseFiles: files created by default */

describe('starterkit:files', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({
                skipInstall: true
            })
            .on('end', done);
    });

    it('creates default files', function() {
        assert.file([
            'package.json',
            '.editorconfig',
            '.jshintrc',
            'README.md',
            'gulpfile.js',
            '.gitignore'
        ]);
    });
});
