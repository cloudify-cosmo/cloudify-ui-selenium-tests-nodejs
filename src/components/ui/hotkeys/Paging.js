'use strict';

var Key = protractor.Key;

exports.next = function(){
    browser.actions().sendKeys(Key.chord('n')).perform();
};

exports.prev = function(){
    browser.actions().sendKeys(Key.chord('p')).perform();
};
