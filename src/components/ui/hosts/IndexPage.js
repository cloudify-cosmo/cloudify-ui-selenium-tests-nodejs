'use strict';

//var logger = require('log4js').getLogger('IndexPage');
var actions = require('../common/Actions');

exports.show = function() {
    element.all(by.css('.gs-btn')).click();
};

exports.selectDropdownOption = function(opts) {
    actions.selectDropdownOption(opts);
};

exports.search = function (criteia) {
    element(by.model('searchFilter')).sendKeys(criteia);
};

exports.getNumOfHosts = function() {
    return element.all(by.css('.gs-table tbody')).count();
};
