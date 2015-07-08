exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Spec patterns are relative to the location of this config.
    specs: [
        'spec/*_spec.js'
    ],

    onPrepare:function( ){
        //For junit output reports
        var reporters = require('jasmine-reporters');
        var capsPromise = browser.getCapabilities();
        capsPromise.then(function (caps) {
            var browserName = caps.caps_.browserName.toUpperCase();
            var browserVersion = caps.caps_.version;
            var prePendStr = browserName + "-" + browserVersion + "-";
            jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('test_result', true, true, prePendStr));
        });
    },

    capabilities: {
        'browserName': 'phantomjs',
        'platform': 'ANY',
        'version': '',
        'chromeOptions': {'args': ['--disable-extensions']}
    },


    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: process.env.PROTRACTOR_BASE_URL || 'http://cloudify.localhost.com',

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: false,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 20000
    }
};