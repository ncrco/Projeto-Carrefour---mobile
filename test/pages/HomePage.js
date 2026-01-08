const { $ } = require('@wdio/globals');
const BasePage = require('../utils/BasePage');
const SELECTORS = require('../config/selectors');
const CONSTANTS = require('../config/constants');

class HomePage extends BasePage {
    // Elementos da página inicial - parametrizados
    get txtWelcome() {
        return $(SELECTORS.HOME.WELCOME_TEXT);
    }

    get btnForms() {
        return $(SELECTORS.HOME.FORMS_BUTTON);
    }

    get btnSwipe() {
        return $(SELECTORS.HOME.SWIPE_BUTTON);
    }

    get btnWebView() {
        return $(SELECTORS.HOME.WEBVIEW_BUTTON);
    }

    get btnLogin() {
        return $(SELECTORS.HOME.LOGIN_BUTTON);
    }

    get btnLogout() {
        return $(SELECTORS.HOME.LOGOUT_BUTTON);
    }

    // Métodos de ação - usando métodos da classe base
    async clickForms() {
        await this.clickElement(this.btnForms);
    }

    async clickSwipe() {
        await this.clickElement(this.btnSwipe);
    }

    async clickWebView() {
        await this.clickElement(this.btnWebView);
    }

    async clickLogin() {
        await this.clickElement(this.btnLogin);
    }

    async clickLogout() {
        await this.clickElement(this.btnLogout);
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
     * Obtém texto de boas-vindas
     * @returns {Promise<string>}
     */
    async getWelcomeText() {
        return await this.getText(this.txtWelcome);
    }

    /**
     * Navega para a tela de formulários
     */
    async navigateToForms() {
        await this.clickForms();
        await this.wait(CONSTANTS.TIMEOUTS.SHORT);
    }

    /**
     * Navega para a tela de swipe
     */
    async navigateToSwipe() {
        await this.clickSwipe();
        await this.wait(CONSTANTS.TIMEOUTS.SHORT);
    }
}

module.exports = new HomePage();

