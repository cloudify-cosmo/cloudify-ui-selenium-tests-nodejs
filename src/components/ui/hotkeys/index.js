'use strict';

var Key = protractor.Key;

exports.Navigations = require('./Navigations');
exports.BlueprintActions = require('./BlueprintActions');
exports.DeploymentActions = require('./DeploymentActions');
exports.Globals = require('./Globals');
exports.ItemsNavigation = require('./ItemsNavigation');
exports.Paging = require('./Paging');
exports.BlueprintNavigation = require('./BlueprintNavigation');
exports.DeploymentNavigation = require('./DeploymentNavigation');

exports.UploadBlueprint = function(){
    browser.actions().sendKeys(Key.chord('u')).perform();
    browser.waitForAngular();
};