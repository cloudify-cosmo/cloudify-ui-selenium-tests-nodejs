'use strict';

exports.route = function(){
    browser.get('/#/node-instances');
};

exports.filters = require('./Filters');
exports.mainTable = require('./MainTable');