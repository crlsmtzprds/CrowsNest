module.exports = function(grunt) {

	grunt.config.set('copy', {
		views: {
			files: [{
        expand: true,
        cwd: './assets',
        src: ['views/**/*'],
        dest: '.tmp/public'
      }]
		},
		build: {
			files: [{
				expand: true,
				cwd: '.tmp/public',
				src: ['**/*'],
				dest: 'www'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
