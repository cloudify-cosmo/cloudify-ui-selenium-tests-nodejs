'use strict';


exports.goTo = function(){
    browser.get('/#/login');
    return this;
};

exports.login = function(username, password){
    element(by.model('loginPage.username')).sendKeys(username);
    element(by.model('loginPage.password')).sendKeys(password);
    element(by.css('form button')).click();


};