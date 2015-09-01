'use strict';


//var logger = require('log4js').getLogger('Blueprints.CreateDeployments');


/**
 * Set deployment name on create deployment dialog
 * @returns {promise}
 */
exports.setName = function(name) {
    return element(by.model('deployment_id')).sendKeys(name);
};

/** Click on 'Raw' tab on create deployment dialog
 */
exports.clickOnRaw = function() {
    element.all(by.css('#deployDialogContainer .deployInputs .buttons-group button')).then(function(btns) {
        btns[1].click();
    });
};

/**
 * Set Deployment Params
 * @returns {promise}
 */
exports.setParams = function( params ) {
    return element(by.model('rawString')).clear().sendKeys(JSON.stringify(params));
};

/**
 * Click on create button on create deployment dialog to complete the creation of new deployment
 * @returns {promise}
 */
exports.deploy = function() {
    return element(by.css('#deployDialogContainer .deployButtons button')).click();
};

/**
 * Click on 'Cancel' button on create deployment dialog
 */
exports.clickCancel = function() {
    element.all(by.css('#deployDialogContainer .close')).then(function(btns) {
        btns[0].click();
    });
};