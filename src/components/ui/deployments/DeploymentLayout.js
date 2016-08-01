'use strict';

var common = require('../common');

exports.closeEventsPanel = function() {
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
    new common.ActionsDropdown().clickMenuOption('Update');
};

exports.isDeploymentUpdating = function(){
    return $('.deployment-action-selector .executingWorkflow span[ng-if="currentUpdate"]').isPresent();
};