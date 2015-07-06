'use strict';
//var logger = require('log4js').getLogger('Gruntfile');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        cfy:{
            all:{}
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/**/*.js',
                'spec/**/*.js',
                'spec_design/**/*.js'
            ]
        },
        protractor:{
            develop:{
                options: {
                    configFile:'protractor.conf.js'
                }
            },
            automatic:{
                options: {
                    configFile: 'automatic.conf.js'
                }

            },
            applitools:{
                options: {
                    configFile: 'applitools.conf.js'
                }

            }
        },
        protractor_webdriver:{
            start:{

            }
        }
    });

    grunt.registerTask('test', [ 'protractor_webdriver','protractor:automatic' ]);

    grunt.registerTask('applitools', [ 'protractor_webdriver','protractor:applitools' ]);

    grunt.registerTask('build', [ 'jshint' ]);

    grunt.registerTask('default', [ 'build' ]);

    grunt.registerTask('protract',[ 'protractor_webdriver','protractor:develop']);
};