'use strict';

var logger = require('log4js').getLogger('deployments_spec');
var components = require('../src/components');

var INSTALLED_DEPLOYMENT_NAME = 'installed_deployment';

xdescribe('deployments page', function () {
    beforeEach(function (done) {
        components.ui.deployments.IndexPage.beforeEach(done);
    });

    it('should list all deployments', function(done) {
        logger.trace('start deployments page test');
        var deployments = components.ui.deployments.IndexPage.getDeployments();
        expect(deployments.count()).toBe(2);
        browser.sleep(10000).then(function(){ done(); });
    });

    xit('should delete a deployment', function (done) {
        logger.trace('start create deployment test');
        components.ui.deployments.IndexPage.deleteDeployment({id: 'deployment_to_delete'});
        components.ui.deployments.DeleteDeployment.clickCancel();
        components.ui.deployments.IndexPage.deleteDeployment({id: 'deployment_to_delete'});
        components.ui.deployments.DeleteDeployment.clickConfirm();

        browser.sleep(1000).then(function(){ done(); });
    });

    xit('should go into deployment and verify all section exists', function(done) {

    });

    xit('should open node details panel when clicking on node in topology section', function(done) {

    });

    xit('should open node details panel when clicking on node in network section', function(done) {

    });

    xit('should open node details panel when clicking on node in nodes section', function (done) {

    });

    xit('should list all executions in executions section', function (done) {

    });

    xit('should show files tree in source section and selected file content', function (done) {

    });
});