const baseConfig = require('./wdio.conf.js');

exports.config = {
    runner: baseConfig.config.runner,
    port: baseConfig.config.port,
    path: baseConfig.config.path,
    specs: baseConfig.config.specs,
    exclude: baseConfig.config.exclude,
    maxInstances: baseConfig.config.maxInstances,
    logLevel: baseConfig.config.logLevel,
    bail: baseConfig.config.bail,
    baseUrl: baseConfig.config.baseUrl,
    waitforTimeout: baseConfig.config.waitforTimeout,
    connectionRetryTimeout: baseConfig.config.connectionRetryTimeout,
    connectionRetryCount: baseConfig.config.connectionRetryCount,
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: [
        ['browserstack', {
            browserstackLocal: false
        }]
    ],
    framework: baseConfig.config.framework,
    reporters: baseConfig.config.reporters,
    mochaOpts: baseConfig.config.mochaOpts,
    before: baseConfig.config.before,
    afterTest: baseConfig.config.afterTest,
    afterSuite: baseConfig.config.afterSuite,
    capabilities: [
        {
            'bstack:options': {
                userName: process.env.BROWSERSTACK_USERNAME,
                accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
                projectName: 'Native Demo App Tests',
                buildName: 'Build ' + new Date().toISOString(),
                sessionName: 'Android Test',
                debug: true,
                networkLogs: true,
                consoleLogs: 'info'
            },
            platformName: 'Android',
            'appium:platformVersion': '11.0',
            'appium:deviceName': 'Samsung Galaxy S21',
            'appium:app': process.env.BROWSERSTACK_APP_ID_ANDROID,
            'appium:automationName': 'UiAutomator2'
        },
        {
            'bstack:options': {
                userName: process.env.BROWSERSTACK_USERNAME,
                accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
                projectName: 'Native Demo App Tests',
                buildName: 'Build ' + new Date().toISOString(),
                sessionName: 'iOS Test',
                debug: true,
                networkLogs: true,
                consoleLogs: 'info'
            },
            platformName: 'iOS',
            'appium:platformVersion': '15.0',
            'appium:deviceName': 'iPhone 13',
            'appium:app': process.env.BROWSERSTACK_APP_ID_IOS,
            'appium:automationName': 'XCUITest'
        }
    ]
};

