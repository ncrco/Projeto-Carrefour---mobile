const { $ } = require('@wdio/globals');

class FormsPage {
    // Elementos da página de formulários
    get inputText() {
        return $('~textInput');
    }

    get switchToggle() {
        return $('~switch');
    }

    get dropdown() {
        return $('~dropdown');
    }

    get btnActive() {
        return $('~activeButton');
    }

    get btnInactive() {
        return $('~inactiveButton');
    }

    get btnSubmit() {
        return $('~submitButton');
    }

    get errorMessage() {
        return $('~formErrorMessage');
    }

    get successMessage() {
        return $('~formSuccessMessage');
    }

    get btnBack() {
        return $('~backButton');
    }

    // Métodos de ação
    async enterText(text) {
        await this.inputText.waitForDisplayed({ timeout: 5000 });
        await this.inputText.setValue(text);
    }

    async toggleSwitch() {
        await this.switchToggle.waitForDisplayed({ timeout: 5000 });
        await this.switchToggle.click();
    }

    async isSwitchOn() {
        const value = await this.switchToggle.getAttribute('checked');
        return value === 'true';
    }

    async selectDropdownOption(option) {
        await this.dropdown.waitForDisplayed({ timeout: 5000 });
        await this.dropdown.click();
        const optionElement = await $(`~${option}`);
        await optionElement.waitForDisplayed({ timeout: 3000 });
        await optionElement.click();
    }

    async clickActiveButton() {
        await this.btnActive.waitForDisplayed({ timeout: 5000 });
        await this.btnActive.click();
    }

    async clickInactiveButton() {
        await this.btnInactive.waitForDisplayed({ timeout: 5000 });
        // Botão inativo não deve ser clicável, mas vamos tentar
        try {
            await this.btnInactive.click();
        } catch (error) {
            // Esperado que falhe
        }
    }

    async clickSubmit() {
        await this.btnSubmit.waitForDisplayed({ timeout: 5000 });
        await this.btnSubmit.click();
    }

    async clickBack() {
        await this.btnBack.waitForDisplayed({ timeout: 5000 });
        await this.btnBack.click();
    }

    async isErrorMessageDisplayed() {
        try {
            await this.errorMessage.waitForDisplayed({ timeout: 3000 });
            return await this.errorMessage.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async getErrorMessageText() {
        if (await this.isErrorMessageDisplayed()) {
            return await this.errorMessage.getText();
        }
        return '';
    }

    async isSuccessMessageDisplayed() {
        try {
            await this.successMessage.waitForDisplayed({ timeout: 3000 });
            return await this.successMessage.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async fillForm(text, switchValue, dropdownOption) {
        await this.enterText(text);
        const currentSwitchState = await this.isSwitchOn();
        if (currentSwitchState !== switchValue) {
            await this.toggleSwitch();
        }
        if (dropdownOption) {
            await this.selectDropdownOption(dropdownOption);
        }
    }
}

module.exports = new FormsPage();

