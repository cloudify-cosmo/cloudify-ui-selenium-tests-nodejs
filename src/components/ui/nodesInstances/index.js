'use strict';

exports.route = function(){
    browser.get('/#/nodes-instances');
    browser.waitForAngular();
};

exports.filters = require('./Filters');
exports.mainTable = require('./MainTable');