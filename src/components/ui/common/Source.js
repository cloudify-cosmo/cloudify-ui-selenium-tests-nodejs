'use strict';


var logger = browser.getLogger('components/Source');

/**
 * @description
 * returns all network subnets
 */

exports.getTree = function() {
    logger.info('getting tree');
    return element.all(by.css('.source .tree')).then(function(tree) {
        expect(tree).not.toBeUndefined();
    });
};

/**
 * @description
 * click on router to open details floating panel
 */
exports.getFileContent = function() {
    return element.all(by.css('.source .sourcecode')).then(function(sourcecode) {
        expect(sourcecode).not.toBeUndefined();
    });
};

exports.selectFile = function(fileName) {
    return element.all(by.css('.tree span.clickable')).filter(function (file) {
        return file.getText().then(function (text) {
            return text === fileName;
        });
    }).click();
};

exports.getFileTitle = function(expectedTitle) {
    return element(by.css('.source .sourcecode h4')).getText().then(function(text) {
        expect(text).toBe(expectedTitle);
    });
};

exports.getLoadingMessage = function() {
    //logger.info('getting loading message');
    var locator = by.css('.noPreview p');
    browser.driver.wait(function () {
        console.log('waiting..');
        return browser.driver.isElementPresent(locator);
    }, 10000);
    return browser.driver.findElement(locator).getText(); // use selenium API directly since we don't want angular synced here..
};