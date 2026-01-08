const { config } = require('@wdio/globals');

// Configurações parametrizadas do ambiente
const CONSTANTS = require('./test/config/constants');
const APPIUM_PORT = CONSTANTS.ENV_CONFIG.APPIUM_PORT;
const APPIUM_HOST = CONSTANTS.ENV_CONFIG.APPIUM_HOST;

exports.config = {
    runner: 'local',
    port: APPIUM_PORT,
    path: '/',
    
    specs: [
        './test/specs/**/*.js'
    ],
    
    exclude: [],
    
    maxInstances: 1,
    
    capabilities: [{
        platformName: CONSTANTS.ENV_CONFIG.PLATFORM === 'ios' ? 'iOS' : 'Android',
        'appium:platformVersion': CONSTANTS.ENV_CONFIG.PLATFORM_VERSION,
        'appium:deviceName': CONSTANTS.ENV_CONFIG.DEVICE_NAME,
        'appium:app': CONSTANTS.ENV_CONFIG.PLATFORM === 'ios' 
            ? CONSTANTS.APP_CONFIG.IOS_APP_PATH 
            : CONSTANTS.APP_CONFIG.ANDROID_APP_PATH,
        'appium:automationName': CONSTANTS.ENV_CONFIG.PLATFORM === 'ios' ? 'XCUITest' : 'UiAutomator2',
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 300
    }],
    
    logLevel: 'info',
    
    bail: 0,
    
    baseUrl: '',
    
    waitforTimeout: CONSTANTS.TIMEOUTS.PAGE_LOAD,
    
    connectionRetryTimeout: 120000,
    
    connectionRetryCount: 3,
    
    services: ['appium'],
    
    framework: 'mocha',
    
    reporters: [
        'spec',
        ['allure', {
            outputDir: CONSTANTS.TEST_CONFIG.ALLURE_RESULTS_PATH,
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
        if (CONSTANTS.TEST_CONFIG.SCREENSHOT_ON_FAILURE && !passed) {
            const screenshotName = test.title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
            const screenshotPath = `${CONSTANTS.TEST_CONFIG.SCREENSHOT_PATH}/${screenshotName}_${Date.now()}.${CONSTANTS.REPORT_CONFIG.SCREENSHOT_FORMAT}`;
            await driver.saveScreenshot(screenshotPath);
        }
    },
    
    afterSuite: async function (suite) {
        if (suite.error && CONSTANTS.TEST_CONFIG.SCREENSHOT_ON_FAILURE) {
            const screenshotPath = `${CONSTANTS.TEST_CONFIG.SCREENSHOT_PATH}/suite_error_${Date.now()}.${CONSTANTS.REPORT_CONFIG.SCREENSHOT_FORMAT}`;
            await driver.saveScreenshot(screenshotPath);
        }
    }
}

