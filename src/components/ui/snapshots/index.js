'use strict';

exports.route = function() {
    browser.get('/#/settings/snapshots');
    browser.waitForAngular();
};

exports.page = require('./snapshotsPage');
exports.createDialog = require('./createSnapshotDialog');
exports.uploadDialog = require('./uploadSnapshotDialog');
