'use strict';

var logger = require('log4js').getLogger('example_spec');
var components = require('../src/components');

describe('blueprints page', function(){
    beforeEach(function(done) {
        components.ui.common.TestUtils.beforeEach(done);
    });

    it('should list all blueprints', function(done){
        logger.trace('start blueprints page test');
        var blueprints = components.ui.blueprints.IndexPage.getBlueprints();
        expect(blueprints.length).toBe(2);
        browser.sleep(1000).then(function(){ done(); });
    });

    it('should create a deployment', function(done) {
        logger.trace('start create deployment test');
        components.ui.blueprints.CreateDeployment.setOptions({
            name: 'deployment1',
            params: {
                'image': 'c6d36e11-f4d5-4221-b6e8-4e97914c67e9',
                'agent_user': 'ubuntu',
                'flavor': 'ba4e08fd-e4c5-4233-a906-f1bb31cb659d'
            }
        });
        components.ui.blueprints.IndexPage.createDeployment({'name' : 'blueprint_to_deploy'});
        components.ui.blueprints.CreateDeployment.clickCancel();
        components.ui.blueprints.IndexPage.createDeployment({'name' : 'blueprint_to_deploy'});
        components.ui.blueprints.CreateDeployment.setName('deployment1');
        components.ui.blueprints.CreateDeployment.clickOnRaw();
        components.ui.blueprints.CreateDeployment.setParams();
        components.ui.blueprints.CreateDeployment.deploy();
        browser.sleep(1000).then(function(){ done(); });
    });

    it('should delete a blueprint', function(done) {
        logger.trace('start delete blueprint test');
        components.ui.blueprints.IndexPage.deleteBlueprint({'name' : 'blueprint_to_delete'});
        components.ui.blueprints.DeleteBlueprint.clickCancel();
        components.ui.blueprints.IndexPage.deleteBlueprint({'name' : 'blueprint_to_delete'});
        components.ui.blueprints.DeleteBlueprint.clickConfirm();
        browser.sleep(1000).then(function(){ done(); });
    });

    it('should go into blueprint and verify all section exists', function(done){
        logger.trace('start blueprint sections test');
        components.ui.blueprints.IndexPage.goToBlueprint({'name' : 'blueprint_to_deploy'});
        components.ui.blueprints.BlueprintPage.goToSection('Network');
        components.ui.blueprints.BlueprintPage.goToSection('Nodes');
        components.ui.blueprints.BlueprintPage.goToSection('Source');
        browser.sleep(1000).then(function(){ done(); });
    });

    it('should open node details panel when clicking on node in topology section', function(done) {
        logger.trace('start blueprint sections test');
        components.ui.blueprints.IndexPage.goToBlueprint({'name' : 'nodecellar1'});
        components.ui.blueprints.BlueprintPage.goToSection('Topology');
        components.ui.blueprints.BlueprintPage.Topology.clickNode('mongod_host');
        components.ui.blueprints.BlueprintPage.FloatingPanel.goToSection('Properties');
        components.ui.blueprints.BlueprintPage.FloatingPanel.goToSection('Relationships');
        components.ui.blueprints.BlueprintPage.FloatingPanel.close();

        browser.sleep(1000).then(function(){ done(); });
    });

    it('should open node details panel when clicking on node in network section', function(done) {
        logger.trace('start blueprint sections test');
        components.ui.blueprints.IndexPage.goToBlueprint({'name' : 'nodecellar1'});
        components.ui.blueprints.BlueprintPage.goToSection('Network');
        components.ui.blueprints.BlueprintPage.getSubnets();
        components.ui.blueprints.BlueprintPage.getRouters();

        browser.sleep(1000).then(function(){ done(); });
    });

    it('should open node details panel when clicking on node in nodes section', function(done) {
        logger.trace('start blueprint sections test');
        components.ui.blueprints.IndexPage.goToBlueprint({'name' : 'nodecellar1'});
        components.ui.blueprints.BlueprintPage.goToSection('Nodes');
        components.ui.blueprints.BlueprintPage.NodesTable.clickNode('mongod');

        browser.sleep(1000).then(function(){ done(); });
    });

    xit('should show files tree in source section', function(done) {
        logger.trace('start blueprint sections test');
        components.ui.blueprints.IndexPage.goToBlueprint({'name' : 'nodecellar1'});
        components.ui.blueprints.BlueprintPage.goToSection('Source');

        browser.sleep(1000).then(function(){ done(); });
    });

    xit('should show file content when clicking on file in source view', function(done) {
        logger.trace('start blueprint sections test');
        components.ui.blueprints.IndexPage.goToBlueprint({'name' : 'nodecellar1'});
        components.ui.blueprints.BlueprintPage.goToSection('Source');

        browser.sleep(1000).then(function(){ done(); });
    });
});

describe('deployments page', function(){

    it('should delete a deployment', function(done) {
        browser.manage().timeouts().pageLoadTimeout(10000);
        logger.trace('start create deployment test');
        components.ui.LoginPage.goTo().login('user1','pass1');
        components.ui.layout.goToView('Deployments');
        components.ui.deployments.IndexPage.goToDeployment({id: 'deployment_to_delete'});
        components.ui.deployments.IndexPage.deleteDeployment();

        browser.sleep(1000).then(function(){ done(); });
    });
});

describe('Hosts page:', function() {

    beforeEach(function(done) {
        components.ui.common.TestUtils.beforeEach(done);
    });

    it('should list all hosts', function(done) {
        logger.trace('start hosts page list all hosts test');

        components.ui.layout.goToView('Hosts');
        components.ui.common.actions.selectDropdownOption({base: $('[name=blueprints]'), optionName: 'nodecellar1'});
        components.ui.hosts.IndexPage.show();

        browser.sleep(1000).then(function(){ done(); });

    });

});