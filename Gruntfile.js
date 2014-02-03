module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {  // CONCATENAR JS I CSS
				    js: {
				        src: [
				            'js/*.js', // All JS in the js folder
				        ],
				        dest: 'js/concatenat.js',
				    },
				    css: {
				        src: [
				            'css/*.css', // All CSS in the css folder
				        ],
				        dest: 'css/concatenat.css',
				    }
        },
        uglify: {  // MINIFICAR JS
			    js: {
			        src: 'js/concatenat.js',
			        dest: 'js/concatenat.min.js'
			    }
			},
			cssmin: {  // MINIFICAR CSS
            css: {
                src: 'css/concatenat.css',
                dest: 'css/concatenat.min.css'
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
			        files: ['js/*.js', 'css/*.css'],
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
