'use strict';

var logger = require('log4js').getLogger('Actions');

/**
 * @description selects a dropdown option according to the opts specification
 *
 * @param {object} opts contains information to find the option in the dropdown
 * @param {string} opts.optionName the name of the option
 * @param {string} opts.repeater the dropdown repeater (optional - defaults to 'option in options').
 * @param {object} opts.base the base element (the dropdown)
 *
 */
exports.selectDropdownOption = function( opts ) {
    logger.trace('selecting dropdown by', opts.optionName );

    if (!opts.repeater) {
        opts.repeater = 'option in options';
    }

    opts.base.all(by.repeater(opts.repeater)).filter(function(option) {
        return option.getText().then(function (text) {
            return text === opts.optionName;
        });
    }).then(function(filtered) {
        filtered[0].click();
    });
};