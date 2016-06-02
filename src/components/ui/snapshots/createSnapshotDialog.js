'use strict';

var form = $('[name="createForm"]');

exports.getForm = function() {
    return form;
};

exports.setDetails = function(id) {
    return form.element(by.model('id')).sendKeys(id);
};

exports.submit = function() {
    form.element(by.css('[ng-click="confirm(id)"]')).click();
};
