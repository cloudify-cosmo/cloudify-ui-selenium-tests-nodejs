'use strict';
var LoginPage = require('../LoginPage');

exports.beforeEach = function(done) {
    browser.manage().timeouts().pageLoadTimeout(10000);
    LoginPage.goTo().login('user1','pass1');
    done();
};