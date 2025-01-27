/*
 * grunt-exorcise
 * https://github.com/mikefrey/grunt-exorcise
 *
 * Copyright (c) 2014 Mike Frey
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/*_test.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    exorcise: {
      default_options: {
        options: {
          bundleDest: 'tmp/map/bundle.js'
        },
        files: [{
          src: ['test/fixtures/bundle.js'],
          dest: 'tmp/map/bundle.map'
        }]
      },
      no_map_options: {
        options: {
          bundleDest: 'tmp/nomap/bundle.js',
          strict: false
        },
        files: [{
          src: ['test/fixtures/bundle.nomap.js'],
          dest: 'tmp/nomap/bundle.map'
        }]
      }
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('mocha', function () {
    var done = this.async();
    require('child_process').exec('mocha', function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'exorcise', 'mocha']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
