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


exports.generate = function( opts ){

    var webdriver = require('selenium-webdriver');

    var driver = new webdriver.Builder().
        usingServer(opts.seleniumServerUrl).
        withCapabilities(webdriver.Capabilities[opts.seleniumBrowserType]()).
        build();
    return driver;
};






