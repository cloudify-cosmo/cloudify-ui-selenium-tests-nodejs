'use strict';

var common = require('../common');
exports.Topology = common.Topology;
exports.FloatingPanel = common.FloatingPanel;
exports.NodesTable = common.NodesTable;

/**
 * @description
 * used to navigate between sections in blueprint page
 * @param sectionName
 */
exports.goToSection = function( sectionName ){
    return common.TabNavigation($('.sections')).goTo(sectionName);
};

exports.getSectionTitle = function(){

};

exports.getSubnets = function() {
    return element.all(by.css('.networksContainer .network .subnet')).then(function(subnets) {
        expect(subnets.length).toBe(2);
        return subnets;
    });
};

exports.getRouters = function() {
    return element.all(by.repeater('device in networks.external.routers')).then(function(routers) {
        expect(routers.length).toBe(1);
        routers[0].click();
    });
};