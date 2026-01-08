const { $ } = require('@wdio/globals');
const BasePage = require('../utils/BasePage');
const SELECTORS = require('../config/selectors');
const CONSTANTS = require('../config/constants');

class FormsPage extends BasePage {
    // Elementos da página de formulários - parametrizados
    get inputText() {
        return $(SELECTORS.FORMS.TEXT_INPUT);
    }

    get switchToggle() {
        return $(SELECTORS.FORMS.SWITCH_TOGGLE);
    }

    get dropdown() {
        return $(SELECTORS.FORMS.DROPDOWN);
    }

    get btnActive() {
        return $(SELECTORS.FORMS.ACTIVE_BUTTON);
    }

    get btnInactive() {
        return $(SELECTORS.FORMS.INACTIVE_BUTTON);
    }

    get btnSubmit() {
        return $(SELECTORS.FORMS.SUBMIT_BUTTON);
    }

    get errorMessage() {
        return $(SELECTORS.FORMS.ERROR_MESSAGE);
    }

    get successMessage() {
        return $(SELECTORS.FORMS.SUCCESS_MESSAGE);
    }

    get btnBack() {
        return $(SELECTORS.FORMS.BACK_BUTTON);
    }

    // Métodos de ação - usando métodos da classe base
    async enterText(text) {
        if (text === null || text === undefined) {
            throw new Error('Texto não pode ser null ou undefined');
        }
        await this.setValue(this.inputText, text);
    }

    async toggleSwitch() {
        await this.clickElement(this.switchToggle);
        await this.wait(CONSTANTS.TIMEOUTS.SHORT); // Aguarda animação
    }

    /**
     * Verifica se o switch está ligado
     * @returns {Promise<boolean>}
     */
    async isSwitchOn() {
        try {
            const value = await this.switchToggle.getAttribute('checked');
            return value === 'true' || value === true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Define o estado do switch
     * @param {boolean} desiredState - Estado desejado (true = ligado, false = desligado)
     */
    async setSwitchState(desiredState) {
        const currentState = await this.isSwitchOn();
        if (currentState !== desiredState) {
            await this.toggleSwitch();
        }
    }

    async selectDropdownOption(option) {
        if (!option) {
            throw new Error('Opção do dropdown não pode ser vazia');
        }
        await this.clickElement(this.dropdown);
        await this.wait(CONSTANTS.TIMEOUTS.SHORT);
        
        const optionElement = await $(`~${option}`);
        await this.clickElement(optionElement, CONSTANTS.TIMEOUTS.SHORT);
    }

    async clickActiveButton() {
        await this.clickElement(this.btnActive);
    }

    async clickInactiveButton() {
        // Botão inativo não deve ser clicável
        const isClickable = await this.waitForClickable(this.btnInactive, CONSTANTS.TIMEOUTS.SHORT);
        if (isClickable) {
            await this.clickElement(this.btnInactive);
        }
    }

    async clickSubmit() {
        await this.clickElement(this.btnSubmit);
        await this.wait(CONSTANTS.TIMEOUTS.SHORT); // Aguarda processamento
    }

    async clickBack() {
        await this.clickElement(this.btnBack);
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
     * Verifica se mensagem de sucesso está exibida
     * @param {number} timeout - Timeout opcional
     * @returns {Promise<boolean>}
     */
    async isSuccessMessageDisplayed(timeout = CONSTANTS.TIMEOUTS.SHORT) {
        return await this.isElementDisplayed(this.successMessage, timeout);
    }

    /**
     * Preenche formulário completo
     * @param {string} text - Texto do input
     * @param {boolean} switchValue - Estado do switch
     * @param {string} dropdownOption - Opção do dropdown (opcional)
     */
    async fillForm(text, switchValue, dropdownOption = null) {
        if (text) {
            await this.enterText(text);
        }
        
        await this.setSwitchState(switchValue);
        
        if (dropdownOption) {
            await this.selectDropdownOption(dropdownOption);
        }
    }

    /**
     * Valida formulário antes de submeter
     * @param {string} text - Texto do input
     * @returns {boolean} True se válido
     */
    isFormValid(text) {
        return text && text.trim() !== '';
    }
}

module.exports = new FormsPage();
