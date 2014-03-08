module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {  // CONCATENAR JS I CSS
				    js: {
				        src: [
				            'src/js/bootstrap.js',
				            'src/js/custom.js'
				        ],
				        dest: 'dest/js/concatenat.js',
				    },
				    css: {
				        src: [
				            'src/css/bootstrap.css',
				            'src/css/bootstrap-responsive.css',
				            'src/css/social-buttons.css',
				            'src/css/custom.css'
				        ],
				        dest: 'dest/css/concatenat.css',
				    }
        },
        uglify: {  // MINIFICAR JS
			    js: {
			        src: 	'dest/js/concatenat.js',
			        dest: 	'dest/js/concatenat.min.js'
			    }
			},
			cssmin: {  // MINIFICAR CSS
            css: {
                src: 	'dest/css/concatenat.css',
                dest: 	'dest/css/concatenat.min.css'
            }
         },

			watch: {
			    scripts: {
			        files: ['src/**/*.js', 'src/css/**/*.css'],
			        tasks: ['concat', 'uglify', 'cssmin'],
			        options: {
			            spawn: false,
			        }
			    }
			}
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'watch']);

};
