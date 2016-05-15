'use strict';

exports.route = function(){
    browser.get('/#/settings/maintenance');
    browser.waitForAngular();
};

exports.page = require('./maintenancePage');
exports.dialog = require('./maintenanceDialog');
exports.message = require('./maintenanceMessage');