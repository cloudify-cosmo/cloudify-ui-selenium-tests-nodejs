'use strict';

var q = require('q');
exports.config = require('./config/index');
exports.driver = require('./driver/index');

exports.ui = require('./ui/index');


exports.init = function(){
    var deferred = q.defer();
    exports.driver.generate(exports.config.selenium);
    deferred.resolve();
    return deferred.promise;
};


