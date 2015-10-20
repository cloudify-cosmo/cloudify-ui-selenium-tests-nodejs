var capabilities = {
    'browserName': 'chrome',
    'chromeOptions': {'args': ['--disable-extensions']}
};



if ( !!process.env.BROWSER_TYPE ) {
    if ( process.env.BROWSER_TYPE.toLowerCase() === 'phantomjs') {
        capabilities = {
            'browserName': 'phantomjs',
            'platform': 'ANY',
            'version': '',
            'chromeOptions': {'args': ['--disable-extensions']}
        }
    }
}

exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Spec patterns are relative to the location of this config.

    suites: {
        sanity: [ 'spec/normalize.js', 'spec/sanity/**' ],
        custom: [ 'spec/normalize.js', process.env.CFY_SPEC ]
    },


    capabilities: capabilities,

    allScriptsTimeout: 600000,


    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: process.env.PROTRACTOR_BASE_URL || 'http://localhost:1616',

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: false,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 600000,
        allScriptsTimeout: 600000
    }
};