'use strict';

var components = require('../../components');
var logger = require('log4js').getLogger('index.spec');

describe('sanity suite', function () {
    this.timeout(components.config.timeout);

    beforeEach(function () {
        logger.info('initializing');
        components.init().then(function(){
            logger.info('initializing complete');
        });
    });

    afterEach(function () {
        logger.info('Close..');
        components.driver.quit().then(function(){
            logger.info('closed!');
        });
    });

    require('./testLayout');
    require('./testLayout2');

});
