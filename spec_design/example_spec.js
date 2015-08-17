'use strict';

// we test on 1920 x 1080 by default

var Eyes = require('eyes.protractor').Eyes;
var eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_KEY);

describe('cloudify-ui layout', function(){
    var init = false;

    function isInitialized()
    {
        if(!init){
            init = true;
            return false;
        }
        else{
            return true
        }
    }

    beforeEach(function(){
        if(!isInitialized()){
            eyes.setMatchLevel('Layout');
            eyes.open(browser, 'Cloudify UI', 'Sanity Suite', {width: 1920, height: 1080});
        }
    });

    it('shows blueprints', function() {
        browser.get('/');
        eyes.checkWindow('Blueprints Page');
    });

    it('checks login layout', function(){
        browser.get('/#/login');
        eyes.checkWindow('Login Page');
    });




    //______________________________________________________________________________________________________________________________________
    //                                                    ~~~~~~~~ ATTENTION ~~~~~~~~
    //We have no indication of how to know when the last test ran, so remember to keep this test the last of all test so it could close eyes
    it('should close Applitools eyes', function(){
        eyes.close();
    });
});
