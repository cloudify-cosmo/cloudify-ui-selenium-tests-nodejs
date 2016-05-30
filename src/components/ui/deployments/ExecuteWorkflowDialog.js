'use strict';

var MultiSelectMenu = require('../common/MultiSelectMenu');

exports.workflows = new MultiSelectMenu($('.select-workflow .multiSelectMenu'), false);
exports.scalingResources = new MultiSelectMenu($('.select-resource .multiSelectMenu'), false);

/**
 *
 * @param {object} opts
 * @param {string} opts.name name of workflow
 */
exports.setDetails = function( opts ){
    if ( !opts.name ) {
        exports.selectWorkflow(opts.name);
    }
};

var confirmButton = $('[ng-click="executeWorkflow()"]');
exports.submit = function(){
    return confirmButton.click();
};

exports.isSubmitDisabled = function(){
    return confirmButton.getAttribute('disabled').then(function(attr){
        return attr ? true : false;
    });
};