'use strict';


var config = require('../config');
var driver = require('../driver').get();

/**
 *
 * @param relative
 * @returns {string}
 */
function getPath(relative){

    if ( relative.indexOf('#/') < 0 ){
        relative = '#/' + relative;
    }

    if ( relative.indexOf('#/') === 0 ){
        relative = '/index.html' + relative;
    }

    return 'http://' + config.cloudifyUiIp + relative;
}

function get( relative ){
    driver.get(getPath(relative));
}


exports.loadBlueprints  = function(){
    get('blueprints');
};


