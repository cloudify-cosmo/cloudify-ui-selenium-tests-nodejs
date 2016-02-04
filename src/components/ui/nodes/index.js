'use strict';

exports.route = function(){
    browser.get('/#/nodes');
};

exports.filters = require('./Filters');
exports.mainTable = require('./MainTable');