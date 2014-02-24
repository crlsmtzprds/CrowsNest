module.exports = function(grunt) {

  grunt.config.set('useuses', {
    app: {
      files: {
        '.tmp/public/js/main.js': 'assets/js/main.js',
        '.tmp/public/js/common.js': 'assets/js/common/main.js'
      },

      options: {
        aliases: {
          'common': 'assets/js/common',
          'angular': 'assets/vendor/angular/angular',
          'angular-ui-router': 'assets/vendor/angular-ui-router/release/angular-ui-router'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-useuses');
};
