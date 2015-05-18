'use strict';

var logger = require('log4js').getLogger('deployments_spec');
var components = require('../src/components');

describe('deployments page', function () {

    beforeEach(function (done) {
        components.ui.deployments.IndexPage.beforeEach(done);
    });

    it('should delete a deployment', function (done) {
        logger.trace('start create deployment test');
        components.ui.deployments.IndexPage.goToDeployment({id: 'deployment_to_delete'});
        components.ui.deployments.IndexPage.deleteDeployment();

        browser.sleep(1000).then(function(){ done(); });
    });
});