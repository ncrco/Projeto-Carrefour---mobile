const { $ } = require('@wdio/globals');

class LoginPage {
    // Elementos da página de login
    get inputUsername() {
        return $('~username');
    }

    get inputPassword() {
        return $('~password');
    }

    get btnLogin() {
        return $('~login');
    }

    get btnSignUp() {
        return $('~signUp');
    }

    get errorMessage() {
        return $('~errorMessage');
    }

    get txtWelcome() {
        return $('~welcome');
    }

    // Métodos de ação
    async enterUsername(username) {
        await this.inputUsername.waitForDisplayed({ timeout: 5000 });
        await this.inputUsername.setValue(username);
    }

    async enterPassword(password) {
        await this.inputPassword.waitForDisplayed({ timeout: 5000 });
        await this.inputPassword.setValue(password);
    }

    async clickLogin() {
        await this.btnLogin.waitForDisplayed({ timeout: 5000 });
        await this.btnLogin.click();
    }

    async clickSignUp() {
        await this.btnSignUp.waitForDisplayed({ timeout: 5000 });
        await this.btnSignUp.click();
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
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

    async isWelcomeMessageDisplayed() {
        try {
            await this.txtWelcome.waitForDisplayed({ timeout: 5000 });
            return await this.txtWelcome.isDisplayed();
        } catch (error) {
            return false;
        }
    }
}

module.exports = new LoginPage();

