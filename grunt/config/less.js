module.exports = function(grunt) {

	grunt.config.set('less', {
		dev: {
			files: [{
				expand: true,
				cwd: 'assets/less/',
				src: ['**/style.less'],
				dest: '.tmp/public/css/',
				ext: '.css'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
};
