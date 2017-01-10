'use strict';

var logger = browser.getLogger('deployments_spec');
var components = require('../../src/components');
var path = require('path');

var testConf = components.config.tests.sanity.deployments_spec;
var creation = components.ui.common.creation;
var hotkeys = components.ui.hotkeys;
var storage = components.utils.localStorage;
var EC = protractor.ExpectedConditions;

var generateNewDeployment = function (blueprintName, inputs) {
    var deploymentName ='deployment_' + new Date().getTime();
    // lets deploy a blueprint to make this test rerunable.. I hate it, but what can we do
    // if deploying was a simple act, we would not care..
    creation.addDeployment(
        blueprintName,
        deploymentName,
        inputs,
        true
    );

    return deploymentName;
};
//var INSTALLED_DEPLOYMENT_NAME = 'installed_deployment';

describe('deployments page', function () {

    beforeEach(function(){ logger.info('running from ' + __filename); });

    beforeEach(function (done) {
        //components.ui.deployments.IndexPage.beforeEach(done);
        components.ui.LoginPage.goTo().login('admin', 'admin');
        components.ui.layout.goToDeployments();
        browser.sleep(1000).then(done);
    });

    describe('single deployment', function(){

        var deploymentName;
        var deploymentsOpts;

        beforeEach(function(done){
            deploymentName = generateNewDeployment('nodecellar1', {
                'agent_private_key_path': 'ggg',
                'agent_user': 'ggg',
                'host_ip': 'ggg'
            });
            deploymentsOpts = {id : deploymentName };
            browser.sleep(1000).then(done);
        });

        it('should not have any search queries in the url after creation', function(done){

            expect(browser.getCurrentUrl()).not.toMatch(/\?/);

            browser.sleep(1000).then(done);
        });

        it('should be deletable from deployments table view', function (done) {

            logger.trace('starting: should be deletable from deployments table view');

            components.ui.layout.goToDeployments();

            var deploymentsOpts = {id : deploymentName };
            components.ui.deployments.IndexPage.deleteDeployment(deploymentsOpts);
            components.ui.deployments.DeleteDeployment.clickCancel();
            components.ui.deployments.IndexPage.deleteDeployment(deploymentsOpts);
            components.ui.deployments.DeleteDeployment.clickConfirm();
            components.ui.deployments.IndexPage.getDeployment(deploymentsOpts,true).then(function(dep){
                expect(dep).toBeUndefined('deployment ' + deploymentsOpts + ' should not exist');
            });
            browser.sleep(1000).then(done);
        });

        describe('should be deletable from deployment layout view', function (){

            beforeEach(function (done){

                components.ui.deployments.DeploymentLayout.deleteDeployment(deploymentsOpts);
                components.ui.deployments.DeleteDeployment.clickCancel();
                components.ui.deployments.DeploymentLayout.deleteDeployment(deploymentsOpts);
                components.ui.deployments.DeleteDeployment.clickConfirm();

                browser.sleep(1000).then(done);
            });

            it('and redirect to deployments table after deletion', function (done) {

                expect(browser.getCurrentUrl()).toContain('deployments');
                components.ui.deployments.IndexPage.getDeployment(deploymentsOpts,true).then(function(dep){
                    expect(dep).toBeUndefined('deployment ' + deploymentsOpts + ' should not exist');
                });

                browser.sleep(1000).then(done);
            });

            it('and not redirect to deployments if user navigated elsewhere', function (done) {
                browser.ignoreSynchronization = true;
                components.ui.deployments.DeleteDeployment.clickClose();
                components.ui.layout.goToBlueprints();
                browser.ignoreSynchronization = false;
                expect(browser.getCurrentUrl()).not.toContain('deployments');
                browser.sleep(1000).then(done);
            });
        });
    });

    describe('update deployment', function(){
        it('should update deployment using url', function(){
            components.ui.layout.goToDeployments();
            var deploymentName = testConf.deployment.deploymentToUpdate.id;
            browser.ignoreSynchronization = true;
            components.ui.deployments.IndexPage.goToDeployment({id: deploymentName});
            browser.wait(EC.presenceOf(element(by.css('.sections'))), 7000).then(function() {
                components.ui.deployments.DeploymentPage.goToNodes();
                browser.ignoreSynchronization = false;

                components.ui.deployments.DeploymentLayout.updateDeployment();
                components.ui.deployments.UpdateDeploymentDialog.archive.input.type('https://github.com/cloudify-cosmo/cloudify-ui-selenium-tests-nodejs/blob/master/src/resources/updated-bomber.tar.gz?raw=true');
                components.ui.deployments.UpdateDeploymentDialog.clickConfirm();

                expect(components.ui.deployments.UpdateDeploymentDialog.isUpdateError()).toBe(false);

                components.ui.deployments.UpdateDeploymentDialog.clickClose();

                browser.wait(EC.stalenessOf($('.update-deployment-dialog')), 7000)
                    .then(function() {
                        expect(components.ui.deployments.DeploymentLayout.isDeploymentUpdating()).toBe(true);
                        components.ui.layout.goToDeployments();
                        expect(components.ui.deployments.IndexPage.isDeploymentUpdating(deploymentName)).toBe(true);
                    });
            });
        });

        xit('should update deployment uploading archive', function(){
            // Works only in chrome, bug in phantom: https://github.com/ariya/phantomjs/issues/10993
            if (browser.browserName === 'chrome') {
                var deploymentName = generateNewDeployment('nodecellar_to_update', {
                    'agent_private_key_path': 'ggg',
                    'agent_user': 'ggg',
                    'host_ip': 'ggg'
                });

                components.ui.deployments.DeploymentLayout.updateDeployment();
                components.ui.deployments.UpdateDeploymentDialog.fileName.type('simple-blueprint.yaml');
                var inputsPath = path.resolve(__dirname, '../../src/resources/cloudify-nodecellar-inputs.yaml');
                components.ui.deployments.UpdateDeploymentDialog.inputs.selectFile(inputsPath);
                var archivePath = path.resolve(__dirname, '../../src/resources/updated-cloudify-nodecellar-example.zip');
                components.ui.deployments.UpdateDeploymentDialog.archive.selectFile(archivePath);
                components.ui.deployments.UpdateDeploymentDialog.selectCustomWorkflow();
                components.ui.deployments.UpdateDeploymentDialog.workflowId.type('update');
                components.ui.deployments.UpdateDeploymentDialog.clickConfirm();

                components.ui.deployments.UpdateDeploymentDialog.isUpdateError()
                    .then(function(isPresent) { expect(isPresent).toBe(false); });
                $('.update-deployment-dialog').isPresent()
                    .then(function(isPresent) { expect(isPresent).toBe(false); });

                components.ui.deployments.DeploymentLayout.isDeploymentUpdating()
                    .then(function(isPresent) { expect(isPresent).toBe(true); });

                components.ui.layout.goToDeployments();
                components.ui.deployments.IndexPage.isDeploymentUpdating(deploymentName)
                    .then(function(isPresent) { expect(isPresent).toBe(true); });
            }
        }).pend('Getting an error: The blueprint you provided for the deployment update contains changes currently unsupported by the deployment update mechanism. Unsupported changes: policy_types:cloudify.policies.types.host_failure policy_types:cloudify.policies.types.ewma_stabilized policy_types:cloudify.policies.types.threshold policy_triggers:cloudify.policies.triggers.execute_workflow');
    });

    describe('single deployment (existing deployment)', function(){
        beforeEach(function(){
            browser.ignoreSynchronization = true;
            components.ui.deployments.IndexPage.goToDeployment({id: testConf.deployment.groupsDeployment});
            browser.wait(EC.presenceOf(element(by.css('.sections'))), 7000).then(function() {
                components.ui.deployments.DeploymentPage.goToNodes();
                browser.ignoreSynchronization = false;
            });
        });

        describe('nodes view', function(){
            it('should have groups', function(){
                expect(components.ui.deployments.NodesTab.getNodesGroups()).toEqual(['group2', 'mongo_and_node', 'group1', 'mongo_and_node']);
            });
        });

        describe('start execution dialog', function(){
            beforeEach(function(){
                components.ui.deployments.DeploymentLayout.executeDeployment();
            });

            describe('scale workflow', function(){
                beforeEach(function(){
                    components.ui.deployments.ExecuteWorkflowDialog.workflows.select('scale');
                });

                it('should load resources to scale', function(){
                    expect($('.select-resource').isPresent()).toBe(true);
                    expect(components.ui.deployments.ExecuteWorkflowDialog.scalingResources.getOptionsTexts()).toEqual([ 'Groups', 'group2', 'group1', 'group3', 'mongo_and_node', 'Nodes', 'host', 'nodecellar', 'mongod', 'nodejs' ]);
                    expect(components.ui.deployments.ExecuteWorkflowDialog.isSubmitDisabled()).toBe(true);
                });

                it('should show parameters', function(){
                    components.ui.deployments.ExecuteWorkflowDialog.scalingResources.select('group1');
                    expect($('[form-raw-params]').isPresent()).toBe(true);
                    expect(components.ui.deployments.ExecuteWorkflowDialog.isSubmitDisabled()).toBe(false);
                });

                describe('multiSelectMenu - groups', function(){
                    it('should navigate between options', function(){
                        components.ui.deployments.ExecuteWorkflowDialog.scalingResources.toggle();
                        hotkeys.Globals.arrowDown();
                        expect(components.ui.deployments.ExecuteWorkflowDialog.scalingResources.getMarkedText()).toBe('group2');
                        hotkeys.Globals.arrowDown();
                        expect(components.ui.deployments.ExecuteWorkflowDialog.scalingResources.getMarkedText()).toBe('group1');
                        hotkeys.Globals.arrowDown();
                        expect(components.ui.deployments.ExecuteWorkflowDialog.scalingResources.getMarkedText()).toBe('group3');
                        hotkeys.Globals.arrowDown();
                        expect(components.ui.deployments.ExecuteWorkflowDialog.scalingResources.getMarkedText()).toBe('mongo_and_node');
                        hotkeys.Globals.arrowDown();
                        expect(components.ui.deployments.ExecuteWorkflowDialog.scalingResources.getMarkedText()).toBe('host');
                        hotkeys.Globals.arrowUp();
                        expect(components.ui.deployments.ExecuteWorkflowDialog.scalingResources.getMarkedText()).toBe('mongo_and_node');
                    });

                    it('should filter and navigate between filtered options', function(){
                        components.ui.deployments.ExecuteWorkflowDialog.scalingResources.toggle();
                        components.ui.deployments.ExecuteWorkflowDialog.scalingResources.filter('no');
                        hotkeys.Globals.arrowDown();
                        expect(components.ui.deployments.ExecuteWorkflowDialog.scalingResources.getMarkedText()).toBe('mongo_and_node');
                        hotkeys.Globals.arrowDown();
                        expect(components.ui.deployments.ExecuteWorkflowDialog.scalingResources.getMarkedText()).toBe('nodecellar');
                        hotkeys.Globals.arrowDown();
                        expect(components.ui.deployments.ExecuteWorkflowDialog.scalingResources.getMarkedText()).toBe('nodejs');
                        hotkeys.Globals.arrowDown();
                        expect(components.ui.deployments.ExecuteWorkflowDialog.scalingResources.getMarkedText()).toBe('nodejs');
                        hotkeys.Globals.arrowUp();
                        expect(components.ui.deployments.ExecuteWorkflowDialog.scalingResources.getMarkedText()).toBe('nodecellar');
                        hotkeys.Globals.arrowUp();
                        expect(components.ui.deployments.ExecuteWorkflowDialog.scalingResources.getMarkedText()).toBe('mongo_and_node');
                        hotkeys.Globals.arrowUp();
                        expect(components.ui.deployments.ExecuteWorkflowDialog.scalingResources.getMarkedText()).toBe('mongo_and_node');
                    });
                });
            });
        });

        describe('update deployment dialog', function(){
            it('should open update dialog', function(){
                components.ui.deployments.DeploymentLayout.updateDeployment();

                expect($('.update-deployment-dialog').isPresent()).toBe(true);
            });

            it('should validate form', function(){
                components.ui.deployments.DeploymentLayout.updateDeployment();
                expect(components.ui.deployments.UpdateDeploymentDialog.isConfirmDisabled()).toBe(true);
                components.ui.deployments.UpdateDeploymentDialog.archive.input.type('http://file');
                expect(components.ui.deployments.UpdateDeploymentDialog.isConfirmDisabled()).toBe(false);
                components.ui.deployments.UpdateDeploymentDialog.selectCustomWorkflow();
                expect(components.ui.deployments.UpdateDeploymentDialog.isConfirmDisabled()).toBe(true);
                components.ui.deployments.UpdateDeploymentDialog.workflowId.type('custom workflow');
                expect(components.ui.deployments.UpdateDeploymentDialog.isConfirmDisabled()).toBe(false);
            });
        });
    });

    it('should list all deployments', function (done) {
        logger.trace('start deployments page test');
        var deployments = components.ui.deployments.IndexPage.getDeployments();
        expect(deployments.count()).toBeGreaterThan(0);
        browser.sleep(1000).then(done);
    });

    it('should go into deployment and verify all sections exist', function (done) {

        components.ui.deployments.IndexPage.goToDeployment(testConf.deployment.deploymentToRead);
        components.ui.deployments.DeploymentPage.goToNodes();
        components.ui.deployments.DeploymentPage.goToExecutions();
        components.ui.deployments.DeploymentPage.goToInputsOutputs();
        components.ui.deployments.DeploymentPage.goToPlugins();
        components.ui.deployments.DeploymentPage.goToSource();
        components.ui.deployments.DeploymentPage.goToMonitoring();

        browser.sleep(1000).then(done);
    });

    it('should open node details panel when clicking on node in topology section', function (done) {
        storage.set('cloudify_eventsMinimized', true); // collapse events widget by default
        browser.ignoreSynchronization = true;
        components.ui.deployments.IndexPage.goToDeployment(testConf.deployment.deploymentToRead);
        browser.sleep(2000);
        components.ui.deployments.DeploymentPage.goToTopology();
        browser.sleep(2000);
        var panel = components.ui.deployments.DeploymentLayout.getNodePropertiesPanel();
        expect(panel.isDisplayed()).toEqual(false, 'panel should not exist');

        components.ui.deployments.DeploymentPage.Topology.clickNode(testConf.deployment.nodeToClick);
        expect(panel.isDisplayed()).toEqual(true, 'panel should exist');
        browser.ignoreSynchronization = false;
        browser.sleep(1000).then(done);
    });

    it('should open update dialog', function(){
        components.ui.deployments.DeploymentLayout.updateDeployment();

        expect($('.update-deployment-dialog').isPresent()).toBe(true);
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
