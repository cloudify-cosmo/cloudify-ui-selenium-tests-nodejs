'use strict';

// we test on 1920 x 1080 by default

var Eyes = require('eyes.protractor').Eyes;
var eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_KEY);

describe('cloudify-ui layout', function(){
    beforeEach(function(){
        eyes.setMatchLevel('Layout');
    });

    afterEach(function(){
        eyes.close();
    });

    it('shows blueprints', function() {
        eyes.open(browser, 'Cloudify UI', 'Blueprints Suite', {width: 1920, height: 1080});
        browser.get('/');
        eyes.checkWindow('Blueprints Page');
    });

    it('checks login layout', function(){
        eyes.open(browser, 'Cloudify UI', 'Login Suite', {width: 1920, height: 1080});
        browser.get('/#/login');
        eyes.checkWindow('Login Page');
    });
})