'use strict';
//var logger = require('log4js').getLogger('Gruntfile');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('cloudify-installer');
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
                'src/**/*.js'
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

            }
        },
        protractor_webdriver:{
            start:{

            }
        }
    });

    grunt.registerTask('test', [ 'protractor_webdriver','protractor:automatic' ]);

    grunt.registerTask('build', [ 'jshint' ]);

    grunt.registerTask('default', [ 'build' ]);

    grunt.registerTask('protract',[ 'jshint','protractor_webdriver','protractor:develop']);
};