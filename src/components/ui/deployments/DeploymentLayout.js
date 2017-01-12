'use strict';

var common = require('../common');
var logger = browser.getLogger('DeploymentLayout');

exports.closeEventsPanel = function() {
    logger.trace('minimizing events widget');

    browser.actions().mouseDown($('[deployment-events] .head')).perform();
    browser.actions().mouseMove({x: 0, y: 700}).perform();
    browser.actions().mouseUp().perform();
};

exports.getNodePropertiesPanel = function(){
    return $('[floating-deployment-node-panel]');
};

exports.deleteDeployment = function() {
    new common.ActionsDropdown().clickMenuOption('Delete');
};

exports.executeDeployment = function() {
    new common.ActionsDropdown().clickMenuOption('Execute Workflow');
};

exports.updateDeployment = function() {
    logger.trace('update deployment');

    return new common.ActionsDropdown().clickMenuOption('Update');
};

exports.isDeploymentUpdating = function(){
    return $('.deployment-action-selector .executingWorkflow span[ng-if="currentUpdate"]').isPresent();
};