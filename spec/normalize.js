'use strict';

/**
 * This file will normalize all tests
 *
 * When you declare a suite in protractor, include this file first to have it normalized
 *
 * @type {Logger}
 */
var logger = require('log4js').getLogger('normalize_tests');

beforeEach(function( ){
    logger.trace('waiting for page load');
    browser.manage().timeouts().pageLoadTimeout(10000);
    browser.driver.manage().window().maximize(); // we will test smaller resolutions in the future
});