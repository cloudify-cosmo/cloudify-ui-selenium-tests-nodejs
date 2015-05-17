'use strict';

var common = require('index');

/**
 * @description
 * used to navigate between sections in floating panel
 * @param sectionName
 */
exports.goToSection = function( sectionName ){
    return common.TabNavigation( $('.buttons-group .buttons-group')).goTo(sectionName);
};

exports.close = function() {
    return element.all(by.css('.properties-panel .close-properties-button')).click();
};