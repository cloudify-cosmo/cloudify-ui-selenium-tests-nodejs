'use strict';

exports.getStatusText = function(){
    return $('#maintenance-status').getText();
};

exports.getButtonText = function(){
    return $('.gs-btn').getText();
};

exports.openMaintenanceDialog = function () {
    $('.gs-btn').click();
};

exports.getExecutingDeploymentNames = function(){
    return $$('.executions-data table tbody .id a').getText();
};

exports.getExecutingStatuses = function(){
    return $$('.executions-data table tbody .status').getText();
};

exports.cancelExecution = function(deploymentId){
    var rowIndex;
    var remainingExecutions = $$('.executions-data table tbody');
    remainingExecutions.$$('.id a').each(function(element, index){
        element.getText().then(function(text){
            if(text === deploymentId){
                rowIndex = index;
            }
        });
    }).then(function(){
        remainingExecutions.get(rowIndex).$('.cancel-execution i').click();
        $('#confirmationDialogContainer .confirmationButtons button[ng-click="cancelWorkflow()"]').click();
    });
};