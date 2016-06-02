'use strict';

var common = require('../common');

exports.getSnapshots = function() {
    return element.all(by.css('.gs-table tbody'));
};

exports.getSnapshot = function(id, optional) {
    return exports.getSnapshots()
        .filter(function(snapshot) {
            return snapshot.element(by.css('.id')).getText().then(function(text) {
                return text === id;
            });
        })
        .then(function(filtered) {
            if (!optional) {
                expect(filtered.length).not.toBe(0, 'snapshot ' + JSON.stringify(id) + ' should exist');
            }
            return filtered[0];
        });
};

exports.clickCreateSnapshot = function() {
    element(by.css('[ng-click="createSnapshot()"]')).click();
    return browser.sleep(1000);
};

exports.clickUploadSnapshot = function() {
    element(by.css('[ng-click="uploadSnapshot()"]')).click();
    return browser.sleep(1000);
};

exports.downloadSnapshot = function(opts) {
    return exports.getSnapshot(opts)
        .then(function(snapshot) {
            new common.ActionsDropdown(snapshot).clickMenuOption('Download');
        });
};

exports.deleteSnapshot = function(opts) {
    return exports.getSnapshot(opts)
        .then(function(snapshot) {
            new common.ActionsDropdown(snapshot).clickMenuOption('Delete');
        })
        .then(function() {
            return element(by.css('[ng-click="confirm(snapshot.id)"]')).click();
        });
};
