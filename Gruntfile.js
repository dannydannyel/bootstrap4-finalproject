'use strict';


module.exports = function(grunt) {

    // Time how long tasks take. Can help with optimizion build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });
    
    const sass = require('node-sass'); // This line is required due in course code didn't work
    
    //Define the init configuration for all the tasks
    grunt.initConfig({
        sass: {
            options: { // This key must be added to avoid a Fatal error given when following the course code without this implementation
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: { 'src/css/styles.css': 'src/css/styles.scss' }
            }
        },
        watch: {
            files: 'src/css/*scss',
            tasks: ['sass']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'src/css/*.css',
                        'src/js/*.js',
                        'src/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        },
        copy: {
            nodeModules : {
                files: [
                {
                    //for css
                    expand: true,
                    dot: true,
                    cwd: './node_modules/bootstrap/dist/css',
                    src: ['bootstrap.min.css'],
                    dst: 'dist/css/'
                },
                {
                    //for js jquery
                    expand: true,
                    dot: true,
                    cwd: './node_modules/jquery/dist',
                    src: ['jquery.min.js'],
                    dst: 'dist/js/'
                },
                {
                    //for js jquery
                    expand: true,
                    dot: true,
                    cwd: './node_modules/popper.js/dist',
                    src: ['popper.min.js'],
                    dst: 'dist/js/'
                },
                {
                    //for js jquery
                    expand: true,
                    dot: true,
                    cwd: './node_modules/bootstrap/dist/js',
                    src: ['bootstrap.min.js'],
                    dst: 'dist/js/'
                }]
            },
            html: {
                files: [
                {
                    //for html
                    expand: true,
                    dot: true,
                    cwd: './src',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            cheatsheets: {
                files: [
                {
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: './src/files',
                    src: ['cheatsheets/*.*'],
                    dest: 'dist/files/'
                }]
            }
        },
        clean: {
            build: {
                src: ['dist/']
            },
            rootFiles: ['bootstrap.*.*', 'jquery.*', 'popper.*']
        },
        
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './src/',
                    src: ['img/*.{png,jpg,gif,svg,jpeg}'],
                    dest: 'dist/'
                }]
            }
        },
        useminPrepare: {
            foo: {
                /*cwd: './src/',*/
                dest: 'dist',
                src: ['src/index.html', 'src/toprated.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context, block) {
                                let generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },
        //Concat
        concat: {
            options: {
                separator: ';'
            },
            // dist configuration is provided by useminPrepare
            dist: {}
        },
        //Uglify
        uglify: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },
        cssmin: {
            dist: {}
        },
        //Filerev
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                //filerev: release hashes(md5) all assets (images, js and css) in dist directory
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            }
        },

        //Usemin
        /*Replaces all assets with revved version in html and css files.
        * options.assetDirs contains the directories for finding the assets
        according to their relative paths
        */
       usemin: {
            html: ['dist/index.html', 'dist/toprated.html'],
            options: {
                assetsDir: ['dist', 'dist/css', 'dist/js']
            }
       },
       htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    'dist/index.html': 'dist/index.html', // 'destination': 'source'
                    'dist/toprated.html': 'dist/toprated.html'
                }
            }
       }
    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build', [
       'clean:build',
       'copy',
       'imagemin',
       'useminPrepare',
       'concat',
       'cssmin',
       'uglify',
       'filerev',
       'usemin',
       'htmlmin',
       'clean:rootFiles'
    ]);
}