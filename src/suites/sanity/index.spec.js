'use strict';

var components = require('../../components');
var logger = browser.getLogger('index.spec');

describe('Sanity suite', function () {
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

    require('./testBlueprints');
    require('./testDeployments');
    require('./testMonitoring');
    require('./testEvents');

});
