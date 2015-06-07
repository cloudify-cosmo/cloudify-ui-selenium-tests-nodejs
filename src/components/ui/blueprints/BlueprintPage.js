'use strict';

var common = require('../common');
exports.Topology = common.Topology;
exports.FloatingPanel = common.FloatingPanel;
exports.NodesTable = common.NodesTable;
exports.Network = common.Network;
exports.Source = common.Source;

/**
 * @description
 * used to navigate between sections in blueprint page
 * @param sectionName
 */
exports.goToSection = function( sectionName ){
    return common.TabNavigation($('.sections')).goTo(sectionName);
};