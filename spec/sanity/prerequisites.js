'use strict';

var logger = browser.getLogger('prerequisites_spec');
var components = require('../../src/components');

var creation = components.ui.common.creation;
var storage = components.utils.localStorage;
var configBlueprints = components.config.tests.sanity.blueprints_spec;
var configDeployments = components.config.tests.sanity.deployments_spec;
var configEvents = components.config.tests.sanity.events_spec;
var configHotkeys = components.config.tests.sanity.hotkeys_spec;

describe('prepare test assumptions', function() {
    beforeAll(function() {
        logger.info('running from ' + __filename);
        components.ui.LoginPage.goTo().login('admin', 'admin');
        storage.set('cloudify_eventsMinimized', true); // collapse events widget by default
    });

    it('should add a blueprint "nodecellar1"', function() {
        creation.addBlueprint(configBlueprints.blueprints.blueprintToDeploy, 'simple-blueprint.yaml', 'https://github.com/cloudify-cosmo/cloudify-nodecellar-example/archive/master.zip');
    });

    it('should add a blueprint "nodecellar_undeployed"', function() {
        creation.addBlueprint(configEvents.blueprintWithoutEvents, 'simple-blueprint.yaml', 'https://github.com/cloudify-cosmo/cloudify-nodecellar-example/archive/master.zip');
    });

    it('should add a blueprint "nodecellar_to_update"', function() {
        creation.addBlueprint('nodecellar_to_update', 'simple-blueprint.yaml', 'https://github.com/cloudify-cosmo/cloudify-nodecellar-example/archive/3.4.1-build.zip');
    });

    it('should add a blueprint "groups"', function() {
        creation.addBlueprint(configBlueprints.blueprints.groupsBlueprint, undefined, 'https://github.com/cloudify-cosmo/cloudify-installer/blob/master/resources/nested-groups.tar.gz?raw=true');
    });

    it('should add a blueprint "bomber"', function() {
        creation.addBlueprint(configEvents.bomberBlueprint, undefined, 'https://github.com/cloudify-cosmo/cloudify-installer/blob/master/resources/bomber.tar.gz?raw=true');
    });

    it('should create a deployment "deployment_to_delete" based on "nodecellar1" blueprint', function() {
        creation.addDeployment(
            configBlueprints.blueprints.blueprintToDeploy,
            configDeployments.deployment.deploymentToDelete.id,
            configBlueprints.deploymentInputs,
            true
        );
    });

    it('should create a deployment "installed_deployment" based on "nodecellar1" blueprint', function() {
        creation.addDeployment(
            configBlueprints.blueprints.blueprintToDeploy,
            configDeployments.deployment.deploymentToRead.id,
            configBlueprints.deploymentInputs,
            true
        );
    });

    it('should create a deployment "installed_deployment2" based on "nodecellar1" blueprint', function() {
        creation.addDeployment(
            configEvents.blueprintWithEvents,
            configEvents.secondInstalledDeployment.id,
            configBlueprints.deploymentInputs,
            true
        );
    });

    it('should create a deployment "hotkeys_deployment" based on "nodecellar1" blueprint', function() {
        creation.addDeployment(
            configBlueprints.blueprints.blueprintToDeploy,
            configHotkeys.executingDeployment,
            configBlueprints.deploymentInputs,
            true
        );
    });

    it('should create a deployment "groups" based on "groups" blueprint', function() {
        creation.addDeployment(
            configBlueprints.blueprints.groupsBlueprint,
            configDeployments.deployment.groupsDeployment,
            configBlueprints.deploymentInputs,
            true
        );
    });

    it('should create and install a deployment "bomber" based on "bomber" blueprint', function() {
        creation.addDeployment(
            configEvents.bomberBlueprint,
            configDeployments.deployment.deploymentToUpdate.id,
            undefined,
            true,
            'install',
            true
        );
    });
});
