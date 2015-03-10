'use strict';

var q = require('q');
var logger = require('log4js').getLogger('Blueprints');
var Upload = require('./Upload');
var CreateDeployments = require('./CreateDeployment');
var Page = require('./Page');

/**
 * Create new instance of Upload
 * @returns {promise}
 */
exports.newUploadInstance = function(){
    var deferred = q.defer();
    deferred.resolve(new Upload());
    return deferred.promise;
};

/**
 * Create new instance of CreateDeployments
 * @returns {promise}
 */
exports.createDeployment = function() {
    var deferred = q.defer();
    deferred.resolve(new CreateDeployments());
    return deferred.promise;
};

/**
 * Create new instance of Page
 * @returns {promise}
 */
exports.page = function() {
    var deferred = q.defer();
    deferred.resolve(new Page());
    return deferred.promise;
};
