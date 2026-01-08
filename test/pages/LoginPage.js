const { $ } = require('@wdio/globals');
const BasePage = require('../utils/BasePage');
const SELECTORS = require('../config/selectors');
const CONSTANTS = require('../config/constants');

class LoginPage extends BasePage {
    // Elementos da página de login - parametrizados
    get inputUsername() {
        return $(SELECTORS.LOGIN.USERNAME_INPUT);
    }

    get inputPassword() {
        return $(SELECTORS.LOGIN.PASSWORD_INPUT);
    }

    get btnLogin() {
        return $(SELECTORS.LOGIN.LOGIN_BUTTON);
    }

    get btnSignUp() {
        return $(SELECTORS.LOGIN.SIGNUP_BUTTON);
    }

    get errorMessage() {
        return $(SELECTORS.LOGIN.ERROR_MESSAGE);
    }

    get txtWelcome() {
        return $(SELECTORS.LOGIN.WELCOME_MESSAGE);
    }

    // Métodos de ação - usando métodos da classe base
    async enterUsername(username) {
        if (!username || username.trim() === '') {
            throw new Error('Username não pode ser vazio');
        }
        await this.setValue(this.inputUsername, username);
    }

    async enterPassword(password) {
        if (!password || password.trim() === '') {
            throw new Error('Password não pode ser vazio');
        }
        await this.setValue(this.inputPassword, password);
    }

    async clickLogin() {
        await this.clickElement(this.btnLogin);
    }

    async clickSignUp() {
        await this.clickElement(this.btnSignUp);
    }

    /**
     * Realiza login completo
     * @param {string} username - Nome de usuário
     * @param {string} password - Senha
     * @param {number} timeout - Timeout opcional
     */
    async login(username, password, timeout = CONSTANTS.TIMEOUTS.ELEMENT_WAIT) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
        await this.wait(CONSTANTS.TIMEOUTS.SHORT); // Aguarda processamento
    }

    /**
     * Verifica se mensagem de erro está exibida
     * @param {number} timeout - Timeout opcional
     * @returns {Promise<boolean>}
     */
    async isErrorMessageDisplayed(timeout = CONSTANTS.TIMEOUTS.SHORT) {
        return await this.isElementDisplayed(this.errorMessage, timeout);
    }

    /**
     * Obtém texto da mensagem de erro
     * @returns {Promise<string>}
     */
    async getErrorMessageText() {
        if (await this.isErrorMessageDisplayed()) {
            return await this.getText(this.errorMessage);
        }
        return '';
    }

    /**
     * Verifica se mensagem de erro contém palavras-chave esperadas
     * @param {string[]} expectedKeywords - Palavras-chave esperadas
     * @returns {Promise<boolean>}
     */
    async verifyErrorMessage(expectedKeywords) {
        const errorText = await this.getErrorMessageText();
        if (!errorText) return false;
        return this.containsKeywords(errorText, expectedKeywords);
    }

    /**
     * Verifica se mensagem de boas-vindas está exibida
     * @param {number} timeout - Timeout opcional
     * @returns {Promise<boolean>}
     */
    async isWelcomeMessageDisplayed(timeout = CONSTANTS.TIMEOUTS.ELEMENT_WAIT) {
        return await this.isElementDisplayed(this.txtWelcome, timeout);
    }

    /**
     * Verifica se login foi bem-sucedido
     * @returns {Promise<boolean>}
     */
    async isLoginSuccessful() {
        return await this.isWelcomeMessageDisplayed();
    }
}

module.exports = new LoginPage();

