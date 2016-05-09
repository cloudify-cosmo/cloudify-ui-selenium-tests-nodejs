'use strict';

var Key = protractor.Key;

exports.goToTopology = function(){
    browser.actions().sendKeys(Key.chord('g')).sendKeys(Key.chord('t')).perform();
};

exports.goToNodes = function(){
    browser.actions().sendKeys(Key.chord('g')).sendKeys(Key.chord('n')).perform();
};

exports.goToSource = function(){
    browser.actions().sendKeys(Key.chord('g')).sendKeys(Key.chord('s')).perform();
};