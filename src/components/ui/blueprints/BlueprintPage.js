'use strict';

var common = require('../common');

/**
 * @description
 * used to navigate between sections in blueprint page
 * @param sectionName
 */
exports.goToSection = function( sectionName ){
    return common.TabNavigation( $('.sections')).goTo(sectionName);
};

exports.getSectionTitle = function(){

};