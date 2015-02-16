
module.exports = function(grunt) {
	grunt.initConfig({
		connect: {
			server: {
				options: {
					port: 9000,
					base: '/src',
					hostname: "localhost",
					livereload: true,
					open: true,
					keepalive: true
				}
			}
		}
		// watch: {
		// 	// sass: {
		// 	// 	files: ['src/sass/**/*.sass'],
		// 	// 	tasks: ['compass']
		// 	// },
		// 	livereload: {
		// 		files: ['*.html'],
		// 		options: {
		// 			livereload: true,
		// 			debounceDelay: 250
		// 		}
		// 	}
		// }
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['connect', 'watch']);
};