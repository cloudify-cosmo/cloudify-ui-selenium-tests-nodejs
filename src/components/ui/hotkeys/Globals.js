'use strict';

var Key = protractor.Key;

exports.quickSearch = function(){
    browser.actions().sendKeys(Key.chord('/')).perform();
};

exports.escape = function(){
    browser.actions().sendKeys(Key.chord(Key.ESCAPE)).perform();
};

exports.tab = function(){
    browser.actions().sendKeys(Key.chord(Key.TAB)).perform();
};

exports.shiftTab = function(){
    browser.actions().sendKeys(Key.chord(Key.SHIFT+Key.TAB)).perform();
};

exports.enter = function(){
    browser.actions().sendKeys(Key.chord(Key.ENTER)).perform();
};

exports.arrowDown = function(){
    browser.actions().sendKeys(Key.chord(Key.ARROW_DOWN)).perform();
};

exports.openCheatSheet = function(){
    browser.actions().sendKeys(Key.chord('?')).perform();
};