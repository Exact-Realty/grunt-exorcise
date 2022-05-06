'use strict';

const assert = require('assert');
const grunt = require('grunt');

describe('grunt-exorcise', () => {
  describe('bundle', () => {
    const actual = grunt.file.read('tmp/map/bundle.js');
    const expected = grunt.file.read('test/expected/bundle.js');
    it('should be rewritten with source map url instead of inlined', () => {
      assert.equal(actual, expected);
    });
  });

  describe('map', () => {
    it('should exist', () => {
      assert.ok(grunt.file.exists('tmp/map/bundle.map'));
    });

    const actual = grunt.file.read('tmp/map/bundle.map');
    const expected = grunt.file.read('test/expected/bundle.map');

    it('should be correct', () => {
      assert.equal(actual, expected);
    });
  });

  describe('noMap', () => {
    it('should exist', () => {
      assert.ok(grunt.file.exists('tmp/nomap/bundle.js'), 'should exist');
    });
    it('should not exist', () => {
      assert.ok(!grunt.file.exists('tmp/nomap/bundle.nomap'));
    });

    const actual = grunt.file.read('tmp/nomap/bundle.js');
    const expected = grunt.file.read('test/fixtures/bundle.nomap.js');

    it('should be correct', () => {
      assert.equal(actual, expected);
    });
  });
});
