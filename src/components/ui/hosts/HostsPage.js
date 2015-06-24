'use strict';

//var logger = require('log4js').getLogger('IndexPage');
var actions = require('../common/Actions');

exports.show = function() {
    element(by.css('.filters .gs-btn')).click();
};

exports.search = function (criteia) {
    element(by.model('searchFilter')).sendKeys(criteia);
};

exports.getNumOfHosts = function() {
    return element.all(by.css('.gs-table tbody')).count();
};

exports.selectBlueprint = function(blueprint) {
    var opts = {base: element(by.name('blueprints')), optionName: blueprint};
    actions.selectDropdownOption(opts);
};

exports.selectDeployment = function(deployment) {
    var opts = {base: element(by.name('deployments')), optionName: deployment};
    actions.selectDropdownOption(opts);
};
