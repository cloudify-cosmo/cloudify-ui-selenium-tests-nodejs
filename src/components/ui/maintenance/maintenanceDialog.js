'use strict';
var dialog = require('../common/Dialog.js');

exports.getTitleText = function(){
    return $('.dialogTitle').getText();
};

exports.confirm = function(){
    $('#change-maintenance-button').click();
};

exports.close = dialog.close;
exports.getErrorText = dialog.getErrorMessage;