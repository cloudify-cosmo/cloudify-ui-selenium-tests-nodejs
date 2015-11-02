'use strict';

/**
 * This file will normalize all tests
 *
 * When you declare a suite in protractor, include this file first to have it normalized
 *
 * @type {Logger}
 */
var logger = require('log4js').getLogger('normalize_tests');
var chalk = require('chalk');
chalk.enabled = true;

beforeEach(function( ){
    console.log( chalk.bold.underline.yellow('currently running :: ' +   jasmine.getEnv().currentSpec.getFullName()));
    logger.trace('waiting for page load');
    browser.manage().timeouts().pageLoadTimeout(10000);
    browser.driver.manage().window().maximize(); // we will test smaller resolutions in the future
});





var recordingSet = false;
beforeEach(function() {

    if (process.env.RECORD && !recordingSet) {

        var folderPath = '/tmp/protractor';
        recordingSet = true;

        var fs = require('fs-extra');
        //var Buffer = require('buffer');
        fs.emptyDirSync(folderPath);
        setInterval(function () {
            try {
                browser.takeScreenshot().then(function (png) {
                    var stream = fs.createWriteStream(folderPath + '/screenshot-' + new Date().getTime() + '.png');
                    stream.write(new Buffer(png, 'base64'));
                    stream.end();
                });
            } catch (e) {
            }
        }, 500);

    }
});

