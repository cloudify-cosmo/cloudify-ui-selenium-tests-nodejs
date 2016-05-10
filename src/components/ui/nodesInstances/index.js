'use strict';

exports.route = function(){
    browser.get('/#/node-instances');
    browser.waitForAngular();
};

exports.filters = require('./Filters');
exports.mainTable = require('./MainTable');