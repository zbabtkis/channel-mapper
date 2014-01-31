module.exports = function(grunt) {
	grunt.initConfig({
		cssmin: {
			combine: {
				files: {
					'dist/main.min.css': ['css/main.css']	
				}
			}
		},
		uglify: {
			my_target: {
				files: {
					'dist/app.min.js': ['src/*.js'],
					'dist/deps.min.js': [
						'components/jquery/jquery.min.js',
						'components/angular/angular.min.js',
						'components/d3/d3.min.js'
					]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('build', ['cssmin', 'uglify']);
};

