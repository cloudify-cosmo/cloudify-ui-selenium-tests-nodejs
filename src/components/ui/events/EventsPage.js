'use strict';

exports.route = function(){
    browser.get('/#/logs');
};

exports.filters = require('./Filters');
exports.mainTable = require('./MainTable');


