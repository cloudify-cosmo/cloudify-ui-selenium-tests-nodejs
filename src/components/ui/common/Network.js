'use strict';

/**
 * @description
 * returns all network subnets
 */
exports.getSubnets = function() {
    return element.all(by.css('.networksContainer .network .subnet')).then(function(subnets) {
        expect(subnets.length).toBe(2);
        return subnets;
    });
};

/**
 * @description
 * click on router to open details floating panel
 */
exports.getRouters = function() {
    return element.all(by.repeater('device in networks.external.routers')).then(function(routers) {
        expect(routers.length).toBe(1);
        routers[0].click();
    });
};