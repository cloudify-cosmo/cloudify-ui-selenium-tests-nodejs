
exports.scrollIntoView = function(element) {
    browser.executeScript(function(element) {
        element.scrollIntoView();
    }, element.getWebElement());
};