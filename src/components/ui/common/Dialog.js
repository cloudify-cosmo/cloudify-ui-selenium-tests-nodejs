'use strict';

var logger = browser.getLogger('Dialog');

exports.clickClose = function() {
    //http://stackoverflow.com/questions/27905584/select-first-visible-element-in-protractor
    $$('.ngdialog-close').filter(function(item) { return item.isDisplayed();}).first().click();
    return browser.sleep(1000); // close effect..
};

exports.close = exports.clickClose;

exports.getErrorMessage = function() {
    return browser.sleep(3000).then(function() {
        logger.info('getting error message');

        return $$('.ngdialog .error-message').filter(function(item) {
            return item.isDisplayed();
        }).first().getText();
    });
};