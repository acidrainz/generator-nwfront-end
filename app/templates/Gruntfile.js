// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function (grunt) {

  'use strict';

  // Load Grunt tasks declared in the package.json file
  require('load-grunt-tasks')(grunt);

  // Configure Grunt
  grunt.initConfig({
    yeoman: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
      },
     less: {
            development: {
                 options: {
                   yuicompress: true
                },
                files: [{
                    expand: true,        // Enable dynamic expansion.
                    cwd: 'app/css',  // Src matches are relative to this path.
                    src: ['*.less'],     // Actual pattern(s) to match.
                    dest: 'app/css/dist',  // Destination path prefix.
                    ext: '.css',         // Dest filepaths will have this extension.
                }]
            }
      },
     imagemin: {
          dist: {
              files: [{
                  expand: true,
                  cwd: '<%%= yeoman.app %>/images',
                  src: '{,*/}*.{gif,jpeg,jpg,png}',
                  dest: '<%%= yeoman.app %>/optimized/images'
              }]
          }
      },

     copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/*',
                        'js/*.js',
                        '{,*/}*.html'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                flatten: true,
                cwd: '<%= yeoman.app %>/css',
                dest: '<%= yeoman.dist %>/css/',
                src: '{,*/}*.css'
            }

        },

    // grunt-express serves the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: 80,
          hostname: '0.0.0.0',
          bases:'<%= yeoman.app %>',
          livereload: true
        }
      }
    },
    // grunt-watch monitors the projects files
    watch: {
      all: {

        files: ['<%= yeoman.app %>/index.html', '<%= yeoman.app %>/css/**/*.css','<%= yeoman.app %>/css/**/*.less', '<%= yeoman.app %>/js/**/*.js'],
        tasks:['less'],
        options: {
          livereload: true
        }
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    }
  });

  // Creates the `server` task
  grunt.registerTask('serve', [
    'less',
    'express',
    'open',
    'imagemin',
    'watch'
  ]);
 grunt.registerTask('build', [
  'copy'
]);




};
