'use strict';

var logger = require('log4js').getLogger('example_spec');
var components = require('../src/components');

describe('blueprints page', function(){
    beforeEach(function(done) {
        components.ui.blueprints.IndexPage.beforeEach(done);
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
        logger.trace('start blueprint topology section  test');
        components.ui.blueprints.IndexPage.goToBlueprint({'name' : 'nodecellar1'});
        components.ui.blueprints.BlueprintPage.goToSection('Topology');
        components.ui.blueprints.BlueprintPage.Topology.clickNode('mongod_host');
        components.ui.blueprints.BlueprintPage.FloatingPanel.goToSection('Properties');
        components.ui.blueprints.BlueprintPage.FloatingPanel.goToSection('Relationships');
        components.ui.blueprints.BlueprintPage.FloatingPanel.close();

        browser.sleep(1000).then(function(){ done(); });
    });

    it('should open node details panel when clicking on node in network section', function(done) {
        logger.trace('start blueprint network section test');
        components.ui.blueprints.IndexPage.goToBlueprint({'name' : 'nodecellar1'});
        components.ui.blueprints.BlueprintPage.goToSection('Network');
        components.ui.blueprints.BlueprintPage.Network.getSubnets();
        components.ui.blueprints.BlueprintPage.Network.getRouters();

        browser.sleep(1000).then(function(){ done(); });
    });

    it('should open node details panel when clicking on node in nodes section', function(done) {
        logger.trace('start blueprint node section test');
        components.ui.blueprints.IndexPage.goToBlueprint({'name' : 'nodecellar1'});
        components.ui.blueprints.BlueprintPage.goToSection('Nodes');
        components.ui.blueprints.BlueprintPage.NodesTable.clickNode('mongod');

        browser.sleep(1000).then(function(){ done(); });
    });

    it('should show files tree in source section and selected file content', function(done) {
        logger.trace('start blueprint source section test');
        components.ui.blueprints.IndexPage.goToBlueprint({'name' : 'nodecellar1'});
        components.ui.blueprints.BlueprintPage.goToSection('Source');
        components.ui.blueprints.BlueprintPage.Source.getTree();
        components.ui.blueprints.BlueprintPage.Source.selectFile('openstack-blueprint.yaml');
        components.ui.blueprints.BlueprintPage.Source.getFileTitle('openstack-blueprint.yaml');
        components.ui.blueprints.BlueprintPage.Source.getFileContent();

        browser.sleep(1000).then(function(){ done(); });
    });
});

xdescribe('deployments page', function(){
    beforeEach(function(done) {
        components.ui.deployments.IndexPage.beforeEach(done, 'Deployments');
    });

    it('should delete a deployment', function(done) {
        logger.trace('start create deployment test');
        components.ui.layout.goToView('Deployments');
        components.ui.deployments.IndexPage.goToDeployment({id: 'deployment_to_delete'});
        components.ui.deployments.IndexPage.deleteDeployment();

        browser.sleep(1000).then(function(){ done(); });
    });
});

describe('Hosts page:', function() {

    beforeEach(function(done) {
        components.ui.hosts.IndexPage.beforeEach(done, 'Hosts');
    });

    it('should list all hosts', function(done) {
        logger.trace('start hosts page list all hosts test');

        components.ui.hosts.IndexPage.selectBlueprint('nodecellar1');
        components.ui.hosts.IndexPage.show();
        expect(components.ui.hosts.IndexPage.getNumOfHosts()).not.toBe(0);

        browser.sleep(1000).then(function(){ done(); });

    });

    it('should list all hosts for deployment', function(done) {
        components.ui.hosts.IndexPage.selectBlueprint('nodecellar1');
        components.ui.hosts.IndexPage.selectDeployment('deployment1');
        components.ui.hosts.IndexPage.show();
        expect(components.ui.hosts.IndexPage.getNumOfHosts()).not.toBe(0);

        browser.sleep(1000).then(function(){ done(); });

    });

    it('should search for a host', function(done) {
        components.ui.hosts.IndexPage.selectBlueprint('nodecellar1');
        components.ui.hosts.IndexPage.show();
        components.ui.hosts.IndexPage.search('mongod');
        expect(components.ui.hosts.IndexPage.getNumOfHosts()).toBe(1);

        browser.sleep(1000).then(function(){ done(); });

    });

});

describe('Events page:', function() {

    beforeEach(function(done) {

    });
});