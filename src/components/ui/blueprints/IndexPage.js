'use strict';

var logger = require('log4js').getLogger('IndexPage');

exports.getBlueprints = function(){
    return element.all(by.repeater('blueprint in blueprints'));
};


/**
 *
 * @description returns a promise the fulfills with the first blueprint found according to opts specification.
 * <p>
 * for example:
 * if opts.name = 'X' - then it will return the first blueprint with name X.
 * </p>
 *
 * @param {object} opts contains information to find the blueprint
 * @param {string} opts.name the name of the blueprint
 * @returns {webdriver.promise.Deferred.promise|*}
 */
exports.getBlueprint = function( opts ){
    logger.trace('getting blueprint by ', opts );
    var deferred = protractor.promise.defer();
    exports.getBlueprints().filter(function(blueprint){
           return blueprint.element(by.css('.name')).getText().then(function( text ){
                return text === opts.name;
           });
        }).then(function(filtered){
            deferred.fulfill(filtered[0]);
        });

    return deferred.promise;
};


exports.goToBlueprint = function( opts ){
    return exports.getBlueprint(opts).then(function(blueprint){
        return blueprint.element(by.css('.name')).click();
    });
};