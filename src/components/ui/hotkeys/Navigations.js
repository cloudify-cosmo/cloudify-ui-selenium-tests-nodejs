'use strict';

var Key = protractor.Key;

exports.blueprints = function(){
    browser.actions().sendKeys(Key.chord(Key.META, 'b')).perform();
};

exports.deployments = function(){
    browser.actions().sendKeys(Key.chord(Key.META, 'd')).perform();
};

exports.logs = function(){
    browser.actions().sendKeys(Key.chord(Key.META, 'l')).perform();
};

exports.nodes = function(){
    browser.actions().sendKeys(Key.chord(Key.META, 'i')).perform();
};