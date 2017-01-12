'use strict';

var ui = require('../index');
var logger = browser.getLogger('creation');

exports.addBlueprint = function(
    blueprintId,
    blueprintFilename,
    blueprintLocation,
    isIgnoreExisting
) {
    logger.trace('creating blueprint', blueprintId);

    ui.layout.goToBlueprints();
    ui.blueprints.IndexPage.getBlueprint({ name: blueprintId }, true).then(function(blue) {
        if (!blue || isIgnoreExisting) {
            ui.blueprints.IndexPage.clickUploadBlueprint();
            ui.blueprints.UploadBlueprintDialog.setDetails({
                blueprint_id: blueprintId,
                blueprint_filename: blueprintFilename,
                blueprint_location: blueprintLocation
            });
            ui.blueprints.UploadBlueprintDialog.submit();
        }
    });
};

exports.addDeployment = function(
    blueprintId,
    deploymentId,
    deploymentInputs,
    isWaitForInitialization,
    workflowToExecute,
    isWaitForExecution,
    isIgnoreExisting
) {
    logger.trace('creating deployment', deploymentId, 'for', blueprintId);

    ui.layout.goToDeployments();
    ui.deployments.IndexPage.getDeployment({ id: deploymentId }, true)
        .then(function(dep) {
            if (!dep || isIgnoreExisting) {
                ui.layout.goToBlueprints();
                ui.blueprints.IndexPage.clickCreateDeployment({ name: blueprintId })
                    .then(function() {
                        ui.blueprints.CreateDeployment.setDetails({
                            name: deploymentId,
                            raw: deploymentInputs
                        });
                    })
                    .then(ui.blueprints.CreateDeployment.confirm)
                    .then(function() {
                        if (isWaitForInitialization || workflowToExecute) {
                            ui.deployments.DeploymentPage.waitForInitializationToStop()
                                .then(function() {
                                    if (workflowToExecute) {
                                        if (isWaitForExecution) {
                                            ui.deployments.IndexPage.executeWorkflowAndWaitUntilDone({
                                                deployment: { id: deploymentId },
                                                workflow: workflowToExecute
                                            });
                                        } else {
                                            ui.deployments.IndexPage.executeWorkflowWithoutWaitingUntilDone({
                                                deployment: { id: deploymentId },
                                                workflow: workflowToExecute
                                            });
                                        }
                                    }
                                });
                        }
                    });
            }
        });
};
