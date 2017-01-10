// If chrome crashes without running tests, make sure you have chromedriver that corresponds to your Chrome version.
// Check the latest version here https://sites.google.com/a/chromium.org/chromedriver/downloads and update the
// postinstall section of package.json (chromedriver:version). Then run `npm run postinstall`

var tempFolderPath = '/tmp';
// var tempFolderPath = 'C:\\Users\\Alex\\AppData\\Local\\Temp\\'; // Windows

var capabilities = {
    'browserName': 'chrome',
    'chromeOptions': {
        args: ['--disable-extensions', '--start-maximized'],
        prefs: {
            'download': {
                'prompt_for_download': false,
                'default_directory': tempFolderPath
            }
        }
    }
};

var timeout = parseInt(process.env.TIMEOUT || "600000", 10);
var browserType = process.env.BROWSER_TYPE;

if (browserType) {
    if (browserType.toLowerCase() === 'phantomjs') {
        capabilities = {
            browserName: 'phantomjs',
            //'phantomjs.cli.args': ['--ignore-ssl-errors=true',  '--web-security=false', '--webdriver-loglevel=DEBUG','--debug=true']
            phantomjs: {
                cli: {
                    args: ['--proxy-type=none', '--ignore-ssl-errors=true', '--web-security=false'/*, '--remote-debugger-port=9090'*/]
                }
            }
        }
    }
}

exports.config = {
    // The address of a running selenium server.
    // seleniumAddress: 'http://localhost:4444/wd/hub',

    // Spec patterns are relative to the location of this config.

    suites: {
        sanity: [
            'spec/sanity/prerequisites.js',
            'spec/sanity/blueprints.js',
            'spec/sanity/deployments.js',
            'spec/sanity/plugins.js',
            'spec/sanity/events.js',
            'spec/sanity/nodesInstances.js',
            'spec/sanity/snapshots.js',
            'spec/sanity/maintenance.js',
            'spec/sanity/hotkeys.js'
        ],
        quickstart: ['spec/quickstart/quickstart.js'],
        'quickstart-cli': ['spec/quickstart/quickstart-cli.js'],
        prerequisites: ['spec/sanity/prerequisites.js'],
        blueprints: ['spec/sanity/blueprints.js'],
        deployments: ['spec/sanity/deployments.js'],
        plugins: ['spec/sanity/plugins.js'],
        events: ['spec/sanity/events.js'],
        hotkeys: ['spec/sanity/hotkeys.js'],
        nodesInstances: ['spec/sanity/nodesInstances.js'],
        snapshots: ['spec/sanity/snapshots.js'],
        maintenance: ['spec/sanity/maintenance.js'],
        custom: [process.env.CFY_SPEC]
    },


    capabilities: capabilities,

    allScriptsTimeout: timeout,


    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: process.env.PROTRACTOR_BASE_URL || 'http://localhost:9000',

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: false,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: timeout,
        allScriptsTimeout: timeout
    },

    onPrepare: function() {
        // At this point, global 'protractor' object will be set up, and
        // jasmine will be available.
        var jasmineReporters = require('jasmine-reporters');
        var windowWidth = 1920;
        var windowHeight = 1080;
        var window = browser.manage().window();
        var recordingSet = false;

        browser.tempFolderPath = tempFolderPath;
        browser.getLogger = function(name) {
            return require('log4js').getLogger(name);
        };

        browser.manage().timeouts().pageLoadTimeout(10000);
        browser.getCapabilities()
            .then(function(capabilities) {
                browser.browserName = capabilities.caps_.browserName;
                browser.platform = capabilities.caps_.platform;

                return window.setSize(windowWidth, windowHeight);
            })
            .then(function getUpdatedWindowSize() {
                return window.getSize();
            })
            .then(function showWindowSize(dimensions) {
                console.log('Running in', browser.browserName, 'on', browser.platform, 'at', dimensions.width + 'x' + dimensions.height);
            });

        jasmine.getEnv().addReporter(new jasmineReporters.TerminalReporter({
            verbosity: 3,
            color: true,
            showStack: true
        }));

        beforeEach(function() {
            if (process.env.RECORD && !recordingSet) {
                var fs = require('fs-extra');
                var folderPath = '/tmp/protractor';

                recordingSet = true;
                fs.emptyDirSync(folderPath);
                setInterval(function() {
                    if (browser.ignoreSynchronization) { // does not work well when not synced.. don't know why.
                        return;
                    }
                    try {
                        browser.takeScreenshot().then(function(png) {
                            var stream = fs.createWriteStream(folderPath + '/screenshot-' + new Date().getTime() + '.png');
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                        });
                    } catch(e) { }
                }, 500);
            }
        });
    }
};
