const { config } = require('./wdio.conf.js');

exports.config = {
    ...config,
    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': '11.0',
        'appium:deviceName': 'Android Emulator',
        'appium:app': './apps/native-demo-app.apk',
        'appium:automationName': 'UiAutomator2',
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 300
    }]
};

