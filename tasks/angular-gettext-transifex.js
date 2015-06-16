'use strict';

var path = require('path');
var isCI = function() {
  return ['CI', 'TRAVIS', 'CONTINUOUS_INTEGRATION'].filter(function(variable) {
    return process.env[variable] === 'true';
  }).length > 0;
};

module.exports = function(grunt) {
  // we need to jump this hoop so we can load our dependencies
  // and use their tasks
  var cwd = process.cwd();
  process.chdir(path.join(__dirname, '..'));
  grunt.loadNpmTasks('grunt-tx');
  grunt.loadNpmTasks('grunt-angular-gettext');
  process.chdir(cwd);

  grunt.registerTask('ng-gettext-transifex-upload', function() {
    if (!isCI()) {
      grunt.fatal('Not allowed in a non-CI environment, read https://github.com/eHealthAfrica/grunt-angular-gettext-transifex#workflow. Run with CI=true to override this.');
    }

    grunt.task.run('nggettext_extract', 'tx:upload');
  });

  grunt.registerTask('ng-gettext-transifex-download', [
    'tx:download',
    'nggettext_compile'
  ]);
};
