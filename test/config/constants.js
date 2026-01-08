/**
 * Constantes e configurações centralizadas do projeto
 * Boas práticas: centralizar valores hardcoded e configurações
 */

module.exports = {
    // Timeouts (em milissegundos)
    TIMEOUTS: {
        SHORT: 3000,
        MEDIUM: 5000,
        LONG: 10000,
        VERY_LONG: 30000,
        ELEMENT_WAIT: 5000,
        PAGE_LOAD: 10000,
        IMPLICIT_WAIT: 5000
    },

    // Seletores - Estratégias de localização
    SELECTOR_STRATEGY: {
        ACCESSIBILITY_ID: 'accessibility id',
        ID: 'id',
        XPATH: 'xpath',
        CLASS_NAME: 'class name',
        NAME: 'name'
    },

    // Mensagens de erro esperadas
    ERROR_MESSAGES: {
        USERNAME_REQUIRED: ['username', 'required', 'usuário'],
        PASSWORD_REQUIRED: ['password', 'required', 'senha'],
        INVALID_CREDENTIALS: ['invalid', 'credentials', 'credenciais', 'incorretas'],
        PASSWORDS_DONT_MATCH: ['password', 'match', 'senha', 'coincidem', 'diferentes'],
        FIELD_REQUIRED: ['required', 'obrigatório', 'campo'],
        FORM_INVALID: ['invalid', 'form', 'formulário']
    },

    // Mensagens de sucesso esperadas
    SUCCESS_MESSAGES: {
        LOGIN_SUCCESS: ['welcome', 'bem-vindo', 'success', 'sucesso'],
        SIGNUP_SUCCESS: ['success', 'sucesso', 'cadastrado', 'registered'],
        FORM_SUBMITTED: ['success', 'submitted', 'enviado', 'sucesso']
    },

    // Configurações de teste
    TEST_CONFIG: {
        RETRY_COUNT: 2,
        SCREENSHOT_ON_FAILURE: true,
        SCREENSHOT_PATH: './screenshots',
        ALLURE_RESULTS_PATH: './allure-results',
        ALLURE_REPORT_PATH: './allure-report'
    },

    // Configurações de aplicativo
    APP_CONFIG: {
        ANDROID_APP_PATH: './apps/native-demo-app.apk',
        IOS_APP_PATH: './apps/native-demo-app.app',
        ANDROID_PACKAGE: 'com.wdiodemoapp',
        IOS_BUNDLE_ID: 'com.wdiodemoapp'
    },

    // Configurações de ambiente
    ENV_CONFIG: {
        APPIUM_PORT: process.env.APPIUM_PORT || 4723,
        APPIUM_HOST: process.env.APPIUM_HOST || 'localhost',
        PLATFORM: process.env.PLATFORM || 'android',
        DEVICE_NAME: process.env.DEVICE_NAME || 'Android Emulator',
        PLATFORM_VERSION: process.env.PLATFORM_VERSION || '11.0'
    },

    // Configurações de dados de teste
    DATA_CONFIG: {
        USERS_FILE: 'users.json',
        INVALID_USERS_FILE: 'invalid_users.json',
        FORM_DATA_FILE: 'form_data.json',
        CSV_DATA_FILE: 'test_data.csv',
        DATA_DIR: './test/data'
    },

    // Configurações de swipe
    SWIPE_CONFIG: {
        SWIPE_DURATION: 500,
        SWIPE_START_PERCENT: 0.8,
        SWIPE_END_PERCENT: 0.2,
        SWIPE_VERTICAL_CENTER: 0.5
    },

    // Configurações de relatório
    REPORT_CONFIG: {
        SCREENSHOT_FORMAT: 'png',
        VIDEO_RECORDING: false,
        LOG_LEVEL: process.env.LOG_LEVEL || 'info'
    }
};

