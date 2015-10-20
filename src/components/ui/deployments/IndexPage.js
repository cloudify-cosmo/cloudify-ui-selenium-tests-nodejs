'use strict';

var logger = require('log4js').getLogger('DeploymentIndexPage');
var common = require('../common');

exports.getDeployments = function(){
    return element.all(by.css('#deploymentTable tbody'));
};

/**
 *
 * @description returns a promise the fulfills with the first deployment found according to opts specification.
 * <p>
 * for example:
 * if opts.id = 'X' - then it will return the first deployment with name X.
 * </p>
 *
 * @param {object} opts contains information to find the deployment
 * @param {string} opts.id the name of the deployment
 * @returns {webdriver.promise.Deferred.promise|*}
 */
exports.getDeployment = function( opts, optional ){
    logger.trace('getting deployment by ', opts );
    return exports.getDeployments().filter(function(deployment){
        return deployment.element(by.css('.id')).getText().then(function( text ){
            return text === opts.id;
        });
    }).then(function(filtered){
        if ( !optional ) {
            expect(filtered.length).toBe(1, 'deployment ' + JSON.stringify(opts) + ' should exist');
        }
        return filtered.length > 0 ? filtered[0] : undefined;
    });

};

exports.goToDeployment = function( opts ){
    return exports.getDeployment(opts).then(function(deployment){
        return deployment.element(by.css('.id a')).click();
    });
};

exports.deleteDeployment = function(opts) {
    return exports.getDeployment(opts).then(function(deployment){
        new common.ActionsDropdown(deployment).clickMenuOption('Delete');
    });
};


