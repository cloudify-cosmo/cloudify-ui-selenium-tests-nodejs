'use strict';

var Key = protractor.Key;

exports.deploy = function(){
    browser.actions().sendKeys(Key.chord('d')).perform();
};

exports.delete = function(){
    browser.actions().sendKeys(Key.chord(Key.SHIFT, 'd')).perform();
};