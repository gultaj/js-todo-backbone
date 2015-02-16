
module.exports = function(grunt) {

	var modRewrite = require('connect-modrewrite');

	grunt.initConfig({
		connect: {
			server: {
				options: {
					port: 9000,
					base: ['src/'],
					hostname: "localhost",
					open: true,
					livereload: 35729
				},
				livereload: {
					options: {
						middleware: function(connect, options) {
						  	var middlewares = [];

							middlewares.push(modRewrite(['^[^\\.]*$ /index.html [L]'])); //Matches everything that does not contain a '.' (period)
							options.base.forEach(function(base) {
								middlewares.push(connect.static(base));
							});
							return middlewares;
						}
					}
				}
			}
		},
		watch: {
			livereload: {
				files: 'src/index.html',
				options: {
					livereload: true
				}
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['connect','watch']);
};