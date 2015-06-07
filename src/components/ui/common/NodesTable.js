'use strict';

/**
 * @description
 * returns all nodes on current table
 */
exports.getNodes = function(){
    return element.all(by.repeater('row in dataTable')).then(function(nodes) {
        expect(nodes.length).toBe(8);
    });
};

/**
 * @description
 * click on node magnifier button ot open details floating panel
 */
exports.clickNode = function( ){
    return element.all(by.css('.nodesTable tbody tr td .node-details')).then(function(buttons) {
        expect(buttons.length).toBe(8);
        buttons[0].click();
    });
};