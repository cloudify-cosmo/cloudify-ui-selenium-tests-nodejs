'use strict';
var components = require('../../../components');

exports.beforeEach = function(done) {
    browser.manage().timeouts().pageLoadTimeout(10000);
    components.ui.LoginPage.goTo().login('user1','pass1');
    done();
};