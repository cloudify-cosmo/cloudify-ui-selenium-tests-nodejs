/**
 * Created by krzysztof on 01.02.16.
 */
var logger = require('log4js').getLogger('CLI');
var shell = require('shelljs');


shell.cd('build/vagrant');
logger.trace(shell.ls(''));

