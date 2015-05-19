'use strict';

var TabNavigation = require('./TabNavigation');

/**
 * @description
 * used to navigate between sections in floating panel
 * @param sectionName
 */
exports.goToSection = function( sectionName ){
    return new TabNavigation( $('.buttons-group .buttons-group')).goTo(sectionName);
};

exports.close = function() {
    return element.all(by.css('.properties-panel .close-properties-button')).click();
};