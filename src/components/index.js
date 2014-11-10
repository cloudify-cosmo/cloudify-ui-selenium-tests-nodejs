

var q = require('q');
exports.config = require('./config');
exports.driver = require('./driver');

exports.ui = require('./ui');


exports.init = function(){
    var deferred = q.defer();
    exports.driver.generate(exports.config.selenium);
    deferred.resolve();
    return deferred.promise;
};


