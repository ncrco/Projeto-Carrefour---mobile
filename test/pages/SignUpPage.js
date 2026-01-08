const { $ } = require('@wdio/globals');
const BasePage = require('../utils/BasePage');
const SELECTORS = require('../config/selectors');
const CONSTANTS = require('../config/constants');

class SignUpPage extends BasePage {
    // Elementos da página de cadastro - parametrizados
    get inputUsername() {
        return $(SELECTORS.SIGNUP.USERNAME_INPUT);
    }

    get inputPassword() {
        return $(SELECTORS.SIGNUP.PASSWORD_INPUT);
    }

    get inputConfirmPassword() {
        return $(SELECTORS.SIGNUP.CONFIRM_PASSWORD_INPUT);
    }

    get btnSignUp() {
        return $(SELECTORS.SIGNUP.SIGNUP_BUTTON);
    }

    get btnBack() {
        return $(SELECTORS.SIGNUP.BACK_BUTTON);
    }

    get errorMessage() {
        return $(SELECTORS.SIGNUP.ERROR_MESSAGE);
    }

    get successMessage() {
        return $(SELECTORS.SIGNUP.SUCCESS_MESSAGE);
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

    async enterConfirmPassword(password) {
        if (!password || password.trim() === '') {
            throw new Error('Confirm password não pode ser vazio');
        }
        await this.setValue(this.inputConfirmPassword, password);
    }

    async clickSignUp() {
        await this.clickElement(this.btnSignUp);
    }

    async clickBack() {
        await this.clickElement(this.btnBack);
    }

    /**
     * Realiza cadastro completo
     * @param {string} username - Nome de usuário
     * @param {string} password - Senha
     * @param {string} confirmPassword - Confirmação de senha
     */
    async signUp(username, password, confirmPassword) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.enterConfirmPassword(confirmPassword);
        await this.clickSignUp();
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
        return await this.getText(this.errorMessage);
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
     * Verifica se mensagem de sucesso está exibida
     * @param {number} timeout - Timeout opcional
     * @returns {Promise<boolean>}
     */
    async isSuccessMessageDisplayed(timeout = CONSTANTS.TIMEOUTS.SHORT) {
        return await this.isElementDisplayed(this.successMessage, timeout);
    }

    /**
     * Verifica se senhas coincidem
     * @param {string} password - Senha
     * @param {string} confirmPassword - Confirmação de senha
     * @returns {boolean}
     */
    passwordsMatch(password, confirmPassword) {
        return password === confirmPassword;
    }
}

module.exports = new SignUpPage();
