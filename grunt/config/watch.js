module.exports = function(grunt) {

	grunt.config.set('watch', {
		api: {

			// API files to watch:
			files: ['api/**/*']
		},

    less: {

      // Assets to watch:
      files: ['assets/less/**/*'],

      // When assets are changed:
      tasks: ['less:dev'],

      // Options for watch
      options: {
        livereload: true
      }

    },

    js: {

      // Assets to watch:
      files: ['assets/js/**/*'],

      // When assets are changed:
      tasks: ['useuses'],

      // Options for watch
      options: {
        livereload: true
      }

    },

    views: {

      // Assets to watch:
      files: ['assets/views/**/*'],

      // When assets are changed:
      tasks: [],

      // Options for watch
      options: {
        livereload: true
      }

    }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
