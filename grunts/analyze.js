/**
 * 'test' Task File:
 * Defines unit testing related tasks for gruntjs
 */
'use strict';
(function (){
    var path = require('path');
    var MEET_CLI_PATH = process.env['NODE_PATH'] + '/meetjs/cli';
    var Env = require(path.resolve(MEET_CLI_PATH, './env'));

    var appConfig = {
        app: require(path.resolve(Env.cwd, './bower.json')).appPath || 'app'
    };

    function initTasksDep (argv, grunt) {
        if (argv.tm || argv['time']) {
            require('time-grunt')(grunt);
        }

        if (argv['style']) {
            return ['jscs'];
        }

        if (argv['hint']) {
            return ['jshint'];
        }

        return ['jscs', 'jshint'];
    }

    function configHint(grunt) {
        grunt.config('jshint', {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= config.app %>/scripts/{,*/}*.js'
                ]
            }
        });

        grunt.loadNpmTasks('grunt-contrib-jshint');
    }

    function configStyle(grunt) {
        grunt.config('jscs', {
            options: {
                config: '.jscsrc',
                verbose: true
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= config.app %>/scripts/{,*/}*.js'
                ]
            },
            test: {
                src: ['test/spec/{,*/}*.js']
            }
        });

        grunt.loadNpmTasks('grunt-jscs');
    }

    module.exports = function (grunt) {
        grunt.initConfig({
            config: appConfig
        });

        var argv = grunt.option('argv');
        var tasksDep = initTasksDep(argv, grunt);

        if (tasksDep.indexOf('jshint') !== -1) {
            configHint(grunt);
        }

        if (tasksDep.indexOf('jscs') !== -1) {
            configStyle(grunt);
        }

        grunt.registerTask('analyze', tasksDep);
    };
}());
