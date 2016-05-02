'use strict';

var Key = protractor.Key;

exports.goToTopology = function(){
    browser.actions().sendKeys(Key.chord('g')).sendKeys(Key.chord('t')).perform();
};

exports.goToNodes = function(){
    browser.actions().sendKeys(Key.chord('g')).sendKeys(Key.chord('n')).perform();
};

exports.goToExecutions = function(){
    browser.actions().sendKeys(Key.chord('g')).sendKeys(Key.chord('e')).perform();
};

exports.goToInputsOutputs = function(){
    browser.actions().sendKeys(Key.chord('g')).sendKeys(Key.chord('i')).perform();
};

exports.goToSource = function(){
    browser.actions().sendKeys(Key.chord('g')).sendKeys(Key.chord('s')).perform();
};

exports.goToMonitoring = function(){
    browser.actions().sendKeys(Key.chord('g')).sendKeys(Key.chord('m')).perform();
};
