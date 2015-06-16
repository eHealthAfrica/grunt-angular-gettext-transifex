/*
 * grunt-angular-gettext-transifex
 * https://github.com/eHealthAfrica/grunt-angular-gettext-transifex
 *
 * Copyright (c) 2015 Robin Mehner
 * Licensed under the Apache, 2.0 licenses.
 */

'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadTasks('tasks');

  grunt.initConfig({
    eslint: {
      target: ['tasks/**/*.js', 'Gruntfile.js']
    }
  });
};
