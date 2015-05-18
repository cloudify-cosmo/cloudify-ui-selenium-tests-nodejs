'use strict';

//var logger = require('log4js').getLogger('IndexPage');
//var actions = require('../common/Actions');
var utils = require('../common/TestUtils');

exports.beforeEach = function(done) {
    utils.beforeEach('Logs & Events');
    done();
};

exports.getNumOfEvents = function() {
    return element.all(by.css('.eventsTable tbody')).count();
};
