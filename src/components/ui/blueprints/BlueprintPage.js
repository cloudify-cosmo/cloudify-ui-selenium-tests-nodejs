'use strict';

var common = require('../common');
exports.Topology = require('../general/Topology');
exports.FloatingPanel = require('../general/FloatingPanel');

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