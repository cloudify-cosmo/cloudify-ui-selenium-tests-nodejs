/**

 Selenium driver for our use


 **/


/**
 *
 * @param opts {
 *
 *          'seleniumServerUrl' : 'http://localhost/wd/hub',
 *          'rootUrl' : 'which url to load'
 * }
 */


var driver = null;
var logger = require('log4js').getLogger('index');


exports.generate = function( opts ){

    var webdriver = require('selenium-webdriver');

    var serverUrl = opts.serverUrl;
    var browserType = opts.browserType;

    if ( !serverUrl || !browserType ){
        throw new Error('serverUrl or browserType not defined');
    }
    logger.info('initializing driver with ', serverUrl, browserType);

    driver = new webdriver.Builder().
        usingServer(opts.serverUrl).
        withCapabilities(webdriver.Capabilities[opts.browserType]()).
        build();
    driver.manage().timeouts().implicitlyWait(10000);
    return driver;
};


exports.get = function(){
    if ( driver === null ){
        throw new Error('driver not initialized!!');
    }
    return driver;
};

exports.quit = function(){
    logger.info('quitting driver. this will take 10 seconds');
    driver.quit();

};






