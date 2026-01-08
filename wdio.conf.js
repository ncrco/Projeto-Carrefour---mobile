const { config } = require('@wdio/globals')

exports.config = {
    runner: 'local',
    port: 4723,
    path: '/',
    
    specs: [
        './test/specs/**/*.js'
    ],
    
    exclude: [],
    
    maxInstances: 1,
    
    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': '11.0',
        'appium:deviceName': 'Android Emulator',
        'appium:app': './apps/native-demo-app.apk',
        'appium:automationName': 'UiAutomator2',
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 300
    }],
    
    logLevel: 'info',
    
    bail: 0,
    
    baseUrl: '',
    
    waitforTimeout: 10000,
    
    connectionRetryTimeout: 120000,
    
    connectionRetryCount: 3,
    
    services: ['appium'],
    
    framework: 'mocha',
    
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    
    before: function (capabilities, specs) {
        const chai = require('chai');
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();
    },
    
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await driver.saveScreenshot(`./screenshots/${test.title.replace(/\s+/g, '_')}_${Date.now()}.png`);
        }
    },
    
    afterSuite: async function (suite) {
        if (suite.error) {
            await driver.saveScreenshot(`./screenshots/suite_error_${Date.now()}.png`);
        }
    }
}

