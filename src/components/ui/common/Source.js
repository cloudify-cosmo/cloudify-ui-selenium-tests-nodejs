'use strict';

/**
 * @description
 * returns all network subnets
 */

exports.getTree = function() {
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
    expect(browser.driver.findElement(by.css('.noPreview p')).getText()).toBe('Generating Blueprint Source View...');
};