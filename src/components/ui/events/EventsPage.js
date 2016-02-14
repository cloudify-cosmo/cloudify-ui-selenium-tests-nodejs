'use strict';

exports.route = function(){
    return browser.get('/#/logs');
};

exports.filters = require('./Filters');
exports.mainTable = require('./MainTable');


