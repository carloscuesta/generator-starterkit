'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;

describe('starterkit:less', function() {

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

    /* less: files created by choosing the less option */

    it('creates expected less files', function() {
        assert.file([
            'src/styles/style.less',
            'src/styles/_includes/_vars.less'
        ]);
    });
});

describe('starterkit:less:dependencies', function() {

    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, './.tmp'))
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                cssPrepro: 'less'
            })
            .on('end', done);
    });

    it('should contain necessary less dependencies', function() {
        [
            'gulp-less'
        ].forEach(function(dependency) {
            assert.fileContent('package.json', dependency);
        });
    });
});

