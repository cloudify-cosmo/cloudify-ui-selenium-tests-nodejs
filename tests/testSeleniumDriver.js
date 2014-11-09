var opts = {
    'seleniumServerUrl': 'http://pc-lab58:4444/wd/hub',
    'seleniumBrowserType': 'chrome'
};
var driver = require('../src/components/driver').generate( opts );

driver.get('http://www.google.com');


setTimeout(function () {

    driver.quit();

}, 10000);





