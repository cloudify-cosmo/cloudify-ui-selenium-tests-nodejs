'use strict';
//var logger = require('log4js').getLogger('Gruntfile');

module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js'
            ]
        },
        jasmine_node: {
            all: ['src/suites']
        }
    });

    grunt.registerTask('test', function () {

        var tasks = [
            'jshint',
            'jasmine_node'
        ];

        grunt.task.run(tasks);
    });

    grunt.registerTask('default', [
        'jshint'
    ]);
};