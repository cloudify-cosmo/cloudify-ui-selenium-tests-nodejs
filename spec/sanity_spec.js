var logger = require('log4js').getLogger('sanity_spec');

describe('sanity suite', function(){
    beforeEach(function( ){
        logger.trace('waiting for page load');
        browser.manage().timeouts().pageLoadTimeout(10000);
    });


    require('./sanity');
});
