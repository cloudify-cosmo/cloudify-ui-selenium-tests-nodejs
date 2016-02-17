'use strict';

var Key = protractor.Key;

exports.execute = function(){
    browser.actions().sendKeys(Key.chord('e')).perform();
};

exports.cancelExecution = function(){
    browser.actions().sendKeys(Key.chord(Key.SHIFT, 'e')).perform();
};

exports.delete = function(){
    browser.actions().sendKeys(Key.chord(Key.SHIFT, 'd')).perform();
};