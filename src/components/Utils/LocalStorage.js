'use strict';

exports.get = function(key) {
    return browser.executeScript('return window.localStorage.getItem("' + key + '");');
};

exports.set = function(key, value) {
    browser.executeScript('window.localStorage.setItem("' + key + '", arguments[0]);', value);
};

exports.clear = function() {
    browser.executeScript('return window.localStorage.clear();');
};
