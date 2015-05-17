'use strict';
var LoginPage = require('../LoginPage');
var Layout = require('../Layout');

exports.beforeEach = function(done, view) {
    browser.manage().timeouts().pageLoadTimeout(10000);
    LoginPage.goTo().login('user1','pass1');
    if (view) {
        Layout.goToView(view);
    }
    done();
};