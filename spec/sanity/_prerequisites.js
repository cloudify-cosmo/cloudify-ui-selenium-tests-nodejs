'use strict';

var logger = require('log4js').getLogger('prerequisites_spec');
var components = require('../../src/components/index');

var configBlueprints = components.config.tests.sanity.blueprints_spec;
var configDeployments = components.config.tests.sanity.deployments_spec;
var configEvents = components.config.tests.sanity.events_spec;
var configHotkeys = components.config.tests.sanity.hotkeys_spec;

function addBlueprint(blueprintId) {
    components.ui.layout.goToBlueprints();
    components.ui.blueprints.IndexPage.getBlueprint({name: blueprintId}, true).then(function(blue) {
        if (!blue) {
            components.ui.blueprints.IndexPage.clickUploadBlueprint();
            components.ui.blueprints.UploadBlueprintDialog.setDetails({
                blueprint_id: blueprintId,
                blueprint_filename: 'simple-blueprint.yaml',
                blueprint_location: 'https://github.com/cloudify-cosmo/cloudify-nodecellar-example/archive/master.zip'
            });
            components.ui.blueprints.UploadBlueprintDialog.submit();
        }
    });
}

function addDeployment(blueprintId, deploymentId, workflowToExecute) {
    components.ui.layout.goToDeployments();
    components.ui.deployments.IndexPage.getDeployment({id: deploymentId}, true).then(function(dep) {
        if (!dep) {
            components.ui.layout.goToBlueprints();
            components.ui.blueprints.IndexPage.createDeployment({name: blueprintId});
            components.ui.blueprints.CreateDeployment.setDetails({
                name: deploymentId,
                raw: configBlueprints.deployment
            });
            components.ui.blueprints.CreateDeployment.confirm();

            if (workflowToExecute) {
                components.ui.deployments.DeploymentPage.waitForInitializingToStop();
                components.ui.deployments.IndexPage.executeWorkflowWithoutWaitingUntilDone({
                    deployment: {id: deploymentId},
                    workflow: workflowToExecute
                });
            }
        }
    });
}

describe('prepare test assumptions', function() {
    beforeAll(function() {
        logger.info('running from ' + __filename);
        components.ui.LoginPage.goTo().login('admin', 'admin');
    });

    it('should add a blueprint "nodecellar1"', function() {
        addBlueprint(configBlueprints.blueprints.blueprintToDeploy);
    });

    it('should create and install a deployment "installed_deployment" based on "nodecellar1" blueprint', function() {
        addDeployment(
            configBlueprints.blueprints.blueprintToDeploy,
            configDeployments.deployment.deploymentToRead.id
        );
    });

    it('should create and install a deployment "installed_deployment2" based on "nodecellar1" blueprint', function() {
        addDeployment(
            configEvents.blueprintWithEvents,
            configEvents.secondInstalledDeployment.id
        );
    });

    it('should add a blueprint "nodecellar_undeployed"', function() {
        addBlueprint(configEvents.blueprintWithoutEvents);
    });

    it('should create a deployment "deployment_to_delete" based on "nodecellar1" blueprint', function() {
        addDeployment(
            configBlueprints.blueprints.blueprintToDeploy,
            configDeployments.deployment.deploymentToDelete.id
        );
    });

    it('should create a deployment "hotkeys_deployment" based on "nodecellar1" blueprint', function() {
        addDeployment(
            configBlueprints.blueprints.blueprintToDeploy,
            configHotkeys.executingDeployment
        );
    });
});
