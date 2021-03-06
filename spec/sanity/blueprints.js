'use strict';

var logger = browser.getLogger('blueprints_spec');
var components = require('../../src/components');

var creation = components.ui.common.creation;
var EC = protractor.ExpectedConditions;

describe('blueprints page', function(){
    var testConf = components.config.tests.sanity.blueprints_spec;
    var BlueprintPage = components.ui.blueprints.BlueprintPage;

    beforeEach(function(){ logger.info('running from ' + __filename); });

    beforeEach(function(){
        components.ui.LoginPage.goTo().login('admin', 'admin');
    });

    describe('blueprint view', function() {

        beforeEach(function () {
            components.ui.blueprints.IndexPage.goToBlueprint({'name': testConf.blueprints.blueprintToRead});
        });

        it('should have all sections', function (done) {
            components.ui.blueprints.BlueprintPage.goToNodes();
            components.ui.blueprints.BlueprintPage.goToPlugins();
            components.ui.blueprints.BlueprintPage.goToSource();
            browser.sleep(1000).then(done);
        });
    });

    describe('source view', function(){

        it('should have working source section', function(done) {
            components.ui.blueprints.IndexPage.goToBlueprint({'name': testConf.blueprints.blueprintToRead});
            BlueprintPage.goToSource();
            BlueprintPage.Source.getTree();
            // we should be viewing the main blueprint file:
            BlueprintPage.Source.getFileTitle('simple-blueprint.yaml');
            BlueprintPage.Source.selectFile('README.md');
            BlueprintPage.Source.getFileTitle('README.md');
            BlueprintPage.Source.getFileContent();

            browser.sleep(1000).then( done );
        });

        it('should have proper loading message', function(done) {

            browser.get('/#/blueprint/nodecellar1/source');
            browser.ignoreSynchronization = true;
            BlueprintPage.Source.getLoadingMessage().then(function(result) {
                expect(result).toBe('Generating blueprint Source View...');
            });

            browser.sleep(0).then(function(){
                browser.ignoreSynchronization = false;
                done();
            });
        });
    });

    describe('blueprints page operations', function(){
        it('should create a deployment, CREATE_DEPLOYMENT_EXISTS', function (done) {
            logger.trace('start create deployment test');

            components.ui.blueprints.IndexPage.clickCreateDeployment({'name' : testConf.blueprints.blueprintToDeploy})
                .then(components.ui.common.Dialog.clickClose); // lets test cancel on the way!

            var newDeploymentName = 'new-deployment-' + new Date().getTime();

            function createDeployment(waitForInitialization, isIgnoreExisting) {
                creation.addDeployment(
                    testConf.blueprints.blueprintToDeploy,
                    newDeploymentName,
                    components.config.tests.sanity.blueprints_spec.deploymentInputs,
                    waitForInitialization,
                    null,
                    null,
                    isIgnoreExisting
                );
            }

            createDeployment(true);

            browser.getCurrentUrl().then(function(url) {
                expect(url).toContain('/deployment/', 'DEPLOY_REDIRECT should redirect to deployments');
            });

            // try to create the same deployment again
            createDeployment(false, true);

            browser.wait(EC.presenceOf(element(by.css('.ngdialog'))), 7000)
                .then(function() {
                    logger.trace('create deployment dialog appeared');

                    components.ui.common.Dialog.getErrorMessage().then(function(text) {
                        expect(text).toContain('already', 'CFY-2902 duplicate name should cause error');
                    });
                    components.ui.common.Dialog.close();

                    components.ui.layout.goToDeployments();
                    components.ui.deployments.IndexPage.deleteDeployment({id:newDeploymentName});
                    components.ui.deployments.DeleteDeployment.clickConfirm();

                    browser.sleep(1000).then(done);
                });
        });

        it('should show deploy dialog after default button pressed', function (done) {

            logger.trace('start create deployment with default button test');

            components.ui.blueprints.IndexPage.createDeploymentWithDefaultBtn({'name' : testConf.blueprints.blueprintToDeploy});
            expect(element(by.css('#deployBlueprintDialog')).isPresent()).toBe(true);

            browser.sleep(500).then(function(){ done(); });
        });

        it('should upload and delete a blueprint, ENTER_BLUEPRINT_NAME', function(done){
            // todo
            //done();
            var blueprintName = 'uploaded-' + new Date().getTime();
            var uploadedBlueprint = { blueprint_id: blueprintName , 'blueprint_filename' : 'simple-blueprint.yaml', 'blueprint_location':'https://github.com/cloudify-cosmo/cloudify-nodecellar-example/archive/master.zip' };
            components.ui.blueprints.IndexPage.uploadBlueprint();

            components.ui.common.Dialog.clickClose();

            expect(components.ui.blueprints.UploadBlueprintDialog.getUploadForm().isPresent()).toBe(false,'CLOSE_BLUEPRINT_DIALOG dialog should be closed after');
            components.ui.blueprints.IndexPage.uploadBlueprint(); // reopen

            components.ui.blueprints.UploadBlueprintDialog.getBlueprintIdLabel().then(function(label){
                expect(label.toLowerCase()).toContain('blueprint id', 'CFY-2301 label should be blueprint id ...  also verifies dialog is open');
            });
            components.ui.blueprints.UploadBlueprintDialog.setDetails(uploadedBlueprint);
            components.ui.blueprints.UploadBlueprintDialog.submit();

            expect(browser.getCurrentUrl()).toContain(uploadedBlueprint.blueprint_id,'UPLOAD_REDIRECT upload should redirect to blueprint when finished');
            //components.ui.blueprints.IndexPage.waitForUploadDone({name: uploadedBlueprint.blueprint_id});
            components.ui.layout.goToBlueprints();

            components.ui.blueprints.IndexPage.deleteBlueprint({name:blueprintName});
            expect(components.ui.blueprints.IndexPage.getBlueprint({name: blueprintName }, true)).toBeUndefined('CFY-3524 delete blueprint should refresh blueprints');

            browser.sleep(1000).then(function(){ done(); });
        });

    });

    describe('topology view', function(){
        it('should open node details panel when clicking on node in topology section', function(done) {
            logger.trace('start blueprint topology section test');
            components.ui.blueprints.IndexPage.goToBlueprint({'name' : testConf.blueprints.blueprintToRead});
            components.ui.blueprints.BlueprintPage.goToTopology();
            components.ui.blueprints.BlueprintPage.Topology.clickNode(testConf.blueprints.nodeToClick);
            components.ui.blueprints.BlueprintPage.PropertiesPanel.waitForVisibility();
            components.ui.blueprints.BlueprintPage.PropertiesPanel.goToProperties();
            components.ui.blueprints.BlueprintPage.PropertiesPanel.goToRelationships();
            components.ui.blueprints.BlueprintPage.PropertiesPanel.close();

            browser.sleep(1000).then(function(){ done(); });
        });
    });

    describe('nodes view', function(){
        it('should have groups', function(){
            components.ui.blueprints.IndexPage.goToBlueprint({'name' : testConf.blueprints.groupsBlueprint});
            components.ui.blueprints.BlueprintPage.goToNodes();

            expect(components.ui.blueprints.NodesTab.getNodesGroups()).toEqual(['group2', 'mongo_and_node', 'group1', 'mongo_and_node']);
        });
    });

    //it('should open node details panel when clicking on node in network section', function (done) {
    //    logger.trace('start blueprint network section test');
    //    components.ui.blueprints.IndexPage.goToBlueprint({'name' : DEPLOY_BLUEPRINT_NAME});
    //    components.ui.blueprints.BlueprintPage.goToSection('Network');
    //    components.ui.blueprints.BlueprintPage.Network.getSubnets();
    //    components.ui.blueprints.BlueprintPage.Network.getRouters();
    //
    //    browser.sleep(1000).then(function(){ done(); });
    //});
    //
    //it('should open node details panel when clicking on node in nodes section', function (done) {
    //    logger.trace('start blueprint node section test');
    //    components.ui.blueprints.IndexPage.goToBlueprint({'name' : DEPLOY_BLUEPRINT_NAME});
    //    components.ui.blueprints.BlueprintPage.goToSection('Nodes');
    //    components.ui.blueprints.BlueprintPage.NodesTable.clickNode('mongod');
    //
    //    browser.sleep(1000).then(function(){ done(); });
    //});

});
