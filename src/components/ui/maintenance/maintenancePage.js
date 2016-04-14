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