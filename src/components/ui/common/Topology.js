'use strict';

var logger = browser.getLogger('Topology');

/**
 * @description
 * returns all nodes on current topology
 */
//exports.getNodes = function(){
//    return element.all(by.css('.bpContainer .box .head'));
//};
exports.getNodes = function(){
    return element.all(by.css('#gridContent .nodeContainer'));
};


/**
 * @description
 * click on a specific node by its title name
 * @param nodeName
 */
exports.getNode = function( nodeName ){
    logger.trace('getting node: ', nodeName );
    var deferred = protractor.promise.defer();
    exports.getNodes().filter(function(node){
        return node.element(by.css('.title')).getText().then(function( text ){
            return text === nodeName;
        });
    }).then(function(filtered){
        deferred.fulfill(filtered[0]);
    });

    return deferred.promise;
};

exports.clickNode = function( nodeName ){

    return exports.getNode(nodeName).then(function(node) {
        return node.click();
    });
};