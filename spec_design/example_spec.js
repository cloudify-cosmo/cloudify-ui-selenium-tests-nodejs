'use strict';

// we test on 1920 x 1080 by default

var Eyes = require('eyes.protractor').Eyes;
var eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_KEY);

describe('cloudify-ui blueprint', function() {
    it('shows blueprints', function() {
        eyes.setMatchLevel('Layout');
        eyes.open(browser, 'Cloudify UI', 'Sanity Suite', {width: 1920, height: 1080});

        browser.get('/');
        eyes.checkWindow('Blueprints Page');

        eyes.close();
    });

});
