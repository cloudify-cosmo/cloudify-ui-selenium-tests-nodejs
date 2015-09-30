'use strict';

var logger = require('log4js').getLogger('deployments_spec');
var components = require('../../src/components');
var testConf = components.config.tests.sanity.deployments_spec;

//var INSTALLED_DEPLOYMENT_NAME = 'installed_deployment';

describe('deployments page', function () {
    beforeEach(function () {
        //components.ui.deployments.IndexPage.beforeEach(done);
        components.ui.LoginPage.goTo().login('user1', 'pass1');
        components.ui.layout.goToDeployments();
    });

    it('should list all deployments', function (done) {
        logger.trace('start deployments page test');
        var deployments = components.ui.deployments.IndexPage.getDeployments();
        expect(deployments.count()).toBeGreaterThan(0);
        browser.sleep(1000).then(done);
    });

    it('should delete a deployment', function (done) {
        logger.trace('start create deployment test');
        components.ui.deployments.IndexPage.getDeployments().count().then(function (countBeforeDeletion) {

            components.ui.deployments.IndexPage.deleteDeployment(testConf.deployment.deploymentToDelete);
            components.ui.deployments.DeleteDeployment.clickCancel();
            browser.sleep(1000);
            components.ui.deployments.IndexPage.deleteDeployment(testConf.deployment.deploymentToDelete);
            components.ui.deployments.DeleteDeployment.clickConfirm();


            browser.wait(function(){
                return components.ui.deployments.IndexPage.getDeployments().count().then(function(count){
                    return count === countBeforeDeletion - 1;
                });
            },120000);
            browser.sleep(1000).then(done);

        }, 150000);

    });

    it('should go into deployment and verify all section exists', function (done) {

        components.ui.deployments.IndexPage.goToDeployment(testConf.deployment.deploymentToRead);
        components.ui.deployments.DeploymentPage.goToNetwork();
        components.ui.deployments.DeploymentPage.goToNodes();
        components.ui.deployments.DeploymentPage.goToExecutions();
        components.ui.deployments.DeploymentPage.goToInputsOutputs();
        //components.ui.deployments.DeploymentPage.goToSource();
        components.ui.deployments.DeploymentPage.goToMonitoring();

        browser.sleep(1000).then(done);
    });

    it('should open node details panel when clicking on node in topology section', function (done) {
        components.ui.deployments.IndexPage.goToDeployment(testConf.deployment.deploymentToRead);
        components.ui.deployments.DeploymentPage.goToTopology();

        // drag Events list down for the nodes to be click-able
        browser.actions().mouseDown(element.all(by.css('.dragBtn')).first()).perform();
        browser.actions().mouseMove({x: 0, y: 700}).perform();
        browser.actions().mouseUp().perform();

        components.ui.deployments.DeploymentPage.Topology.clickNode(testConf.deployment.nodeToClick);
        var panel = element.all(by.css('[floating-deployment-node-panel]'));
        expect(panel.count()).toEqual(1, 'panel should exist');
        expect(panel.getCssValue('display')).not.toEqual('none', 'panel should be visible');

        browser.sleep(1000).then(done);
    });

    //xit('should open node details panel when clicking on node in network section', function (done) {
    //
    //});
    //
    //xit('should open node details panel when clicking on node in nodes section', function (done) {
    //
    //});
    //
    //xit('should list all executions in executions section', function (done) {
    //
    //});
    //
    //xit('should show files tree in source section and selected file content', function (done) {
    //
    //});
});