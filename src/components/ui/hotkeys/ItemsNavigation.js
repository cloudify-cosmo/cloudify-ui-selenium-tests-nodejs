'use strict';

var Key = protractor.Key;

exports.next = function(){
    browser.actions().sendKeys(Key.chord('j')).perform();
};

exports.prev = function(){
    browser.actions().sendKeys(Key.chord('k')).perform();
};
