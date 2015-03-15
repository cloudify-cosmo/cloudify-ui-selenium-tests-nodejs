'use strict';

var q = require('q');
var driver = require('../../driver');
var logger = require('log4js').getLogger('Blueprints.Page');
var css = require('selenium-webdriver').By.css;

/**
 * Blueprint page
 * @constructor
 */
var Page = function() {

    /**
     * Select blueprint by position
     * @param {number} position - position number on the list
     * @returns {promise}
     */
    this.selectByPosition = function(position) {
        var deferred = q.defer();
        // define default child
        if(!position || position < 1) {
            position = 1;
        }
        // get the selected deployment row
        driver.get().findElement(css('#main-content .gs-table tbody tr:nth-child(' + position + ') td')).then(function(blueprintRow){
            deferred.resolve(blueprintRow);
        });
        return deferred.promise;
    };

    /**
     * Get blueprint header element
     * @returns {promise}
     */
    this.getHeader = function() {
        var deferred = q.defer();
        driver.get().wait(function(){
            return driver.get().findElement(css('#blueprint-header')).then(function(header){
                if(header.isDisplayed()) {
                    logger.info('header is displayed!');
                    return header;
                }
                else {
                    logger.info('header is not display yes');
                    return false;
                }
            });
        }, 200000).then(function(header){
            logger.info('header is on, resolve now!');
            deferred.resolve(header);
        }).thenCatch(function(){
            logger.info('Header is undetected, Timeout!');
            deferred.resolve('Header is undetected');
        });
        return deferred.promise;
    };

    /**
     * Switch tabs
     * @param {string} section - tab label text
     * @returns {promise}
     */
    this.switchTab = function(section) {
        var deferred = q.defer();
        driver.get().findElements(css('#blueprint-header .buttons-group.sections button')).then(function(tabs){
            var count = 0;
            var findTab = false;
            for(var i = 0; i < tabs.length; i++) {
                (function(tab){
                    tab.getText().then(function(tabText){
                        count++;
                        if(tabText === section) {
                            findTab = true;
                            tab.click().then(function(){
                                deferred.resolve();
                            });
                        }
                        if(!findTab && count === tabs.length) {
                            deferred.resolve('Unable to find any tab match for you request');
                        }
                    });
                })(tabs[i]);
            }
        });
        return deferred.promise;
    };

    /**
     * Get topology hosts list
     * @returns {promise}
     */
    this.getTopologyHosts = function() {
        var deferred = q.defer();
        driver.get().findElements(css('.bpContainer > div > .box')).then(function(hosts){
            deferred.resolve(hosts);
        });
        return deferred.promise;
    };

    /**
     * Get networks list
     * @returns {promise}
     */
    this.getNetworks = function(){
        var deferred = q.defer();
        driver.get().findElements(css('.networksContainer > .network')).then(function(networks){
            deferred.resolve(networks);
        });
        return deferred.promise;
    };

    /**
     * Get nodes list
     * @returns {promise}
     */
    this.getNodes = function(){
        var deferred = q.defer();
        driver.get().findElements(css('.nodesTable .gs-table tbody')).then(function(networks){
            deferred.resolve(networks);
        });
        return deferred.promise;
    };

    /**
     * Get Source tree
     * @returns {promise}
     */
    this.getSourceTree = function(){
        var deferred = q.defer();
        driver.get().findElements(css('.source .tree li')).then(function(networks){
            deferred.resolve(networks);
        });
        return deferred.promise;
    };

};

module.exports = Page;