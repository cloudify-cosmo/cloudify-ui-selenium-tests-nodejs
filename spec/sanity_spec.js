'use strict';

var logger = require('log4js').getLogger('sanity_spec');

describe('sanity suite', function(){
    beforeEach(function( ){
        logger.trace('waiting for page load');
        browser.manage().timeouts().pageLoadTimeout(10000);
        browser.driver.manage().window().maximize(); // we will test smaller resolutions in the future
    });


    // possible values:
    // ./sanity
    // ./blueprints
    require(process.env.SUITE || './sanity');
});
