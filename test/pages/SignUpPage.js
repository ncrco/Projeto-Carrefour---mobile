const { $ } = require('@wdio/globals');

class SignUpPage {
    // Elementos da página de cadastro
    get inputUsername() {
        return $('~signUpUsername');
    }

    get inputPassword() {
        return $('~signUpPassword');
    }

    get inputConfirmPassword() {
        return $('~signUpConfirmPassword');
    }

    get btnSignUp() {
        return $('~signUpButton');
    }

    get btnBack() {
        return $('~backButton');
    }

    get errorMessage() {
        return $('~signUpErrorMessage');
    }

    get successMessage() {
        return $('~signUpSuccessMessage');
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

    async enterConfirmPassword(password) {
        await this.inputConfirmPassword.waitForDisplayed({ timeout: 5000 });
        await this.inputConfirmPassword.setValue(password);
    }

    async clickSignUp() {
        await this.btnSignUp.waitForDisplayed({ timeout: 5000 });
        await this.btnSignUp.click();
    }

    async clickBack() {
        await this.btnBack.waitForDisplayed({ timeout: 5000 });
        await this.btnBack.click();
    }

    async signUp(username, password, confirmPassword) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.enterConfirmPassword(confirmPassword);
        await this.clickSignUp();
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
}

module.exports = new SignUpPage();

