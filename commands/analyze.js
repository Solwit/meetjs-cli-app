/**
 * Meet.js CLI - 'analyze' command
 * Analyzes all Meet.js application files
 */
'use strict';
(function (){
    var _ = require('underscore');
    var path = require('path');
    var fs = require('fs');

    var MEET_CLI_PATH = process.env['NODE_PATH'] + '/meetjs/cli';

    var utils = require(path.resolve(MEET_CLI_PATH, './utils'));

    var Command = require(path.resolve(MEET_CLI_PATH, './command'));
    var Env = require(path.resolve(MEET_CLI_PATH, './env'));
    var Handler = require(path.resolve(MEET_CLI_PATH, './handler'));

    var analyzeCommand = new Command('analyze');

    var PATH = path.resolve(Env.cwd, './grunts/' + analyzeCommand.name + '.js');

    function run (argv){
        if (!Env.isMeetProject){
            Handler.fail('Error! Not a valid Meet.js Project path.');
        }

        if (fs.existsSync(PATH)){
            analyzeCommand.loadTask(PATH, argv);

            var tasks = [analyzeCommand.name];
            analyzeCommand.startGruntTasks(tasks);
        } else {
            Handler.fail('Error loading task file. Please make sure the file exists.');
        }
    }


    /**
     * 'analyze' command Options
     */
    analyzeCommand.desc = 'Analyzes all current Meet.js application files.';

    analyzeCommand.addOption({
        long: 'style',
        desc: 'Runs only code style check'
    });

    analyzeCommand.addOption({
        long: 'hint',
        desc: 'Runs only JSHint analytics'
    });

    analyzeCommand.addExample({
        usage: 'meet analyze',
        desc: 'This will perform static code analyze in current project directory.'
    });

    analyzeCommand.addExample({
        usage: 'meet analyze --style',
        desc: 'This will perform static code analyze in current project directory only for code style.'
    });

    analyzeCommand.run = function (argv) {
        run(argv);
    };

    module.exports = analyzeCommand;
}());
