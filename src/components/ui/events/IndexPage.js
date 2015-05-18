'use strict';

//var logger = require('log4js').getLogger('IndexPage');
var actions = require('../common/Actions');
var utils = require('../common/TestUtils');

exports.beforeEach = function(done) {
    utils.beforeEach('Logs & Events');
    done();
};

exports.getNumOfEvents = function() {
    return element.all(by.css('.eventsTable tbody')).count();
};

exports.uncheckAllBlueprints = function() {
    var opts = {base: element(by.name('blueprints'))};
    actions.uncheckAllDropdownOptions(opts);
};

exports.selectBlueprint = function(blueprint) {
    var opts = {base: element(by.name('blueprints')), optionName: blueprint};
    actions.selectDropdownOption(opts);
};

exports.uncheckAllDeployments = function() {
    var opts = {base: element(by.name('deployments'))};
    actions.uncheckAllDropdownOptions(opts);
};

exports.selectDeployment = function(deployment) {
    var opts = {base: element(by.name('deployments')), optionName: deployment};
    actions.selectDropdownOption(opts);
};

exports.selectTimeframe = function(timeframe) {
    var opts = {base: element(by.name('timeframe')), optionName: timeframe};
    actions.selectDropdownOption(opts);
};

exports.show = function() {
    element(by.css('.filters .gs-btn')).click();
};
