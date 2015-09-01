'use strict';

var logger = require('log4js').getLogger('blueprints_spec');
var TabNavigation = require('./TabNavigation');

/**
 * @description
 * used to navigate between sections in floating panel
 * @param sectionName
 */
exports.goToSection = function( sectionName ){
    logger.trace('go to section ' + sectionName);
    return new TabNavigation( $('[floating-blueprint-node-panel] > .properties-panel .buttons-group')).goTo(sectionName);
};

exports.close = function() {
    return element.all(by.css('[floating-blueprint-node-panel] > .properties-panel .close-properties-button')).click();
};