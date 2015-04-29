'use strict';


var config = require('../config/index');
var driver = require('../driver/index');

/**
 *
 * @param relative
 * @returns {string}
 */
function getPath(relative) {

    if (relative.indexOf('#/') < 0) {
        relative = '#/' + relative;
    }

    if (relative.indexOf('#/') === 0) {
        relative = '/index.html' + relative;
    }

    return 'http://' + config.cloudifyUiIp + relative;
}

function get(relative) {
    driver.get().get(getPath(relative));
}


exports.loadBlueprints = function () {
    get('blueprints');
};

exports.loadDeployments = function () {
    get('deployments');
};

exports.loadEvents = function() {
    get('logs');
};


