'use strict';

var form = $('[name="uploadForm"]');

exports.getForm = function() {
    return form;
};

exports.setDetails = function(url, id) {
    form.element(by.model('inputText')).sendKeys(url);
    form.element(by.model('snapshotId')).sendKeys(id);
};

exports.submit = function() {
    form.element(by.css('[ng-click="upload()"]')).click();
};
