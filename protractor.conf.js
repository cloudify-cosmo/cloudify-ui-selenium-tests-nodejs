var capabilities = {
    'browserName': 'chrome',
    'chromeOptions': {'args': ['--disable-extensions']}
};

if (process.env.BROWSER_TYPE == 'PhantomJS') {
    capabilities = {
        'browserName': 'phantomjs',
        'platform': 'ANY',
        'version': '',
        'chromeOptions': {'args': ['--disable-extensions']}
    }
}
process.env.PROTRACTOR_BASE_URL = 'http://10.10.1.10';

exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Spec patterns are relative to the location of this config.
    specs: [
        'spec/*_spec.js'
    ],


    capabilities: capabilities,

    allScriptsTimeout: 600000,


    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: process.env.PROTRACTOR_BASE_URL || 'http://127.0.0.1:9001',

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: false,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 600000,
        allScriptsTimeout: 600000
    }
};