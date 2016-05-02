'use strict';

exports.route = function(){
    browser.get('/#/logs');
    browser.waitForAngular();
};

exports.filters = require('./Filters');
exports.mainTable = require('./MainTable');


