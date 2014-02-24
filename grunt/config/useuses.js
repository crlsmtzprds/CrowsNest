module.exports = function(grunt) {

  grunt.config.set('useuses', {
    app: {
      files: {
        '.tmp/public/js/main.js': 'assets/js/main.js',
        '.tmp/public/js/core.js': 'assets/js/core/main.js'
      },

      options: {
        aliases: {
          'core': 'assets/js/core',
          'angular': 'assets/vendor/angular/angular',
          'angular-ui-router': 'assets/vendor/angular-ui-router/release/angular-ui-router'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-useuses');
};
