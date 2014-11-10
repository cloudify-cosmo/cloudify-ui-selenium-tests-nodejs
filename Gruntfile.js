'use strict';
//var logger = require('log4js').getLogger('Gruntfile');

module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
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
        jasmine_node: {
            reporter: require('jshint-stylish'),
            all: ['src/suites']
        }
    });

    grunt.registerTask('test', [ 'jasmine_node' ]);

    grunt.registerTask('build', [ 'jshint' ]);

    grunt.registerTask('default', [ 'jshint', 'test' ]);
};