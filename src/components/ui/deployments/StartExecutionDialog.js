/**
 * Created by krzysztof on 30.10.15.
 */
'use strict';

var common = require('../common');
var components = require('../../index');
var testConf = components.config.tests.sanity.deployments_spec;

var logger = require('log4js').getLogger('StartExecutionDialog');

exports.selectExecution = function (executionName) {

    var menu = element.all(by.css('.select-workflow')).first();
    menu.click().then(function () {
        menu.all(by.css('li')).each(function (li) {
            li.getText().then(function (text) {
                if (text === executionName) {
                    li.click();
                }
            });
        })
    });

};