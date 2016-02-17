'use strict';

var Key = protractor.Key;

exports.Navigations = require('./Navigations');
exports.BlueprintActions = require('./BlueprintActions');
exports.DeploymentActions = require('./DeploymentActions');

exports.UploadBlueprint = function(){
    browser.actions().sendKeys(Key.chord('u')).perform();
};