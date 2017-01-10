'use strict';

var logger = browser.getLogger('DeploymentPage');
var common = require('../common');
var components = require('../../index');

var testConf = components.config.tests.sanity.deployments_spec;
var EC = protractor.ExpectedConditions;

exports.Topology = common.Topology;

/**
 * Wait for Initializing deployment to complete
 * @returns {promise}
 */
//this.onInitializedComplete = function() {
//    var deferred = q.defer();
//    driver.get().findElement(css('#deployment-header .deploymentLoader')).then(function(loader){
//        driver.get().wait(function(){
//            return loader.isDisplayed().then(function(displayed){
//                if(!displayed) {
//                    deferred.resolve(true);
//                    return true;
//                }
//                else {
//                    return false;
//                }
//            });
//        }, 200000).thenCatch(function(){
//            deferred.resolve(false);
//        });
//    });
//    return deferred.promise;
//};

/**
 * Get the header element of a deployment page
 * @returns {promise}
 */
//this.getHeader = function() {
//    var deferred = q.defer();
//    driver.get().wait(function(){
//        return driver.get().findElement(css('#deployment-header')).then(function(header){
//            if(header.isDisplayed()) {
//                logger.info('header is displayed!');
//                return header;
//            }
//            else {
//                logger.info('header is not display yes');
//                return false;
//            }
//        });
//    }, 200000).then(function(header){
//        logger.info('header is on, resolve now!');
//        deferred.resolve(header);
//    }).thenCatch(function(){
//        logger.info('Header is undetected, Timeout!');
//        deferred.resolve('Header is undetected');
//    });
//    return deferred.promise;
//};

/**
 * Wait for approximately 3 minutes for the install to be complete
 * @returns {promise}
 */
//this.isInstallSuccessful = function() {
//    var deferred = q.defer();
//    driver.get().findElement(css('#appStatus .gauge')).then(function(gauge){
//        driver.get().wait(function(){
//            return gauge.getText().then(function(status){
//                logger.info('App Status:', status + '%');
//                if(status === '100') {
//                    return true;
//                }
//                else {
//                    return false;
//                }
//            });
//        }, 900000).then(function(){
//            deferred.resolve(null);
//        }).thenCatch(function(){ // it should complete the install within 15 min
//            deferred.resolve('Install failed!');
//        });
//    });
//    return deferred.promise;
//};

function goToSection(sectionName) {
    logger.trace('navigating to ' + sectionName + ' tab');
    return common.TabNavigation($('.sections')).goTo(sectionName);
}

exports.goToTopology = function () {
    goToSection(testConf.deployment.sections.topology.name);
};

exports.goToNodes = function () {
    goToSection(testConf.deployment.sections.nodes.name);
};

exports.goToExecutions = function () {
    goToSection(testConf.deployment.sections.executions.name);
};

exports.goToInputsOutputs = function () {
    goToSection(testConf.deployment.sections.inputs_outputs.name);
};

exports.goToPlugins = function () {
    goToSection(testConf.deployment.sections.plugins.name);
};

exports.goToSource = function () {
    goToSection(testConf.deployment.sections.source.name);
};

exports.goToMonitoring = function () {
    goToSection(testConf.deployment.sections.monitoring.name);
};


exports.waitForInitializationToStop = function() {
    logger.trace('waiting for initialization to stop');

    browser.ignoreSynchronization = true;

    var urlChangedToDeploymentView = function() {
        return browser.getCurrentUrl().then(function(url) {
            return /deployment\//.test(url);
        });
    };

    browser.wait(urlChangedToDeploymentView, 7000).then(function() {
        logger.trace('redirected to deployment view');
    });

    return browser.sleep(1500)
        .then(function() {
            return browser.wait(EC.and(
                EC.stalenessOf(element(by.css('[ng-if="isInitializing()"]'))),
                EC.stalenessOf(element(by.css('[data-ng-if="isInitializing()"]')))
            ), 7000);
        })
        .then(function() {
            logger.trace('deployment is initialized');

            components.ui.deployments.DeploymentPage.goToNodes(); // in case if there are problems with topology tab
            browser.ignoreSynchronization = false;
        });
};

/**
 * Get topology hosts list
 * @returns {promise}
 */
//this.getTopologyHosts = function() {
//    var deferred = q.defer();
//    driver.get().findElements(css('.bpContainer > div > .box')).then(function(hosts){
//        deferred.resolve(hosts);
//    });
//    return deferred.promise;
//};
//
///**
// * Get networks list
// * @returns {promise}
// */
//this.getNetworks = function(){
//    var deferred = q.defer();
//    driver.get().findElements(css('.networksContainer > .network')).then(function(networks){
//        deferred.resolve(networks);
//    });
//    return deferred.promise;
//};
//
///**
// * Get nodes list
// * @returns {promise}
// */
//this.getNodes = function(){
//    var deferred = q.defer();
//    driver.get().findElements(css('.nodesTable .gs-table tbody')).then(function(networks){
//        deferred.resolve(networks);
//    });
//    return deferred.promise;
//};
//
///**
// * Get executions list
// * @returns {promise}
// */
//this.getExecutions = function(){
//    var deferred = q.defer();
//    driver.get().findElements(css('.executions .gs-table tbody')).then(function(networks){
//        deferred.resolve(networks);
//    });
//    return deferred.promise;
//};
