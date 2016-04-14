'use strict';

exports.route = function(){
    browser.get('/#/settings/maintenance');
};

exports.page = require('./maintenancePage');
exports.dialog = require('./maintenanceDialog');
exports.message = require('./maintenanceMessage');