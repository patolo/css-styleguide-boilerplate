module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        open: {
            dev: {
                path: 'http://localhost:<%= connect.server.options.port %>'
            }
        },
        connect: {
            server: {
                options: {
                    port: 8001,
                    base: './styleguide/'
                }
            }
        },
        watch: {
            src: {
                files: ['src/**/*.*'],
                tasks: ['styleguide']
            },
            gruntfile: {
                files: ['gruntfile.js'],
                tasks: ['jshint:gruntfile']
            }
        },
        jshint: {
            gruntfile: ['<%= watch.gruntfile.files %>']
        },
        clean: {
            style: ['styleguide']
        },
        styleguide: {

            styledocco: {

                options: {

                    framework: {
                        name: 'styledocco'
                    },

                    name: 'Style Guide'


                },

                files: {
                    'styleguide': 'src/css/*.*'
                }
            }
        }



    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', ['clean', 'styleguide', 'connect', 'open:dev', 'watch']);

};