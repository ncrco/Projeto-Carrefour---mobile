const { config } = require('./wdio.conf.js');

exports.config = {
    ...config,
    capabilities: [{
        platformName: 'iOS',
        'appium:platformVersion': '15.0',
        'appium:deviceName': 'iPhone 13',
        'appium:app': './apps/native-demo-app.app',
        'appium:automationName': 'XCUITest',
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 300
    }]
};

