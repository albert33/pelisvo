module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {  // CONCATENAR JS I CSS
				    js: {
				        src: [
				            'js/src/bootstrap.js', 'js/src/custom.js'
				        ],
				        dest: 'js/dest/concatenat.js',
				    },
				    css: {
				        src: [
				            'css/src/bootstrap.css', 'bootstrap-responsive.css', 'social-buttons.css', 'css/src/customcss.css'
				        ],
				        dest: 'css/dest/concatenat.css',
				    }
        },
        uglify: {  // MINIFICAR JS
			    js: {
			        src: 'js/dest/concatenat.js',
			        dest: 'js/dest/concatenat.min.js'
			    }
			},
			cssmin: {  // MINIFICAR CSS
            css: {
                src: 'css/dest/concatenat.css',
                dest: 'css/dest/concatenat.min.css'
            }
         },
			imagemin: {
			    dynamic: {
			        files: [{
			            expand: true,
			            cwd: 'img/',
			            src: ['**/*.{png,jpg,gif}'],
			            dest: 'img/'
			        }]
			    }
			},
			watch: {
			    scripts: {
			        files: ['js/src/*.js', 'css/src/*.css'],
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
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'imagemin', 'watch']);

};
