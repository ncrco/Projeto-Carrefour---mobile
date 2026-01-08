const { $ } = require('@wdio/globals');

class HomePage {
    // Elementos da página inicial
    get txtWelcome() {
        return $('~welcome');
    }

    get btnForms() {
        return $('~forms');
    }

    get btnSwipe() {
        return $('~swipe');
    }

    get btnWebView() {
        return $('~webView');
    }

    get btnLogin() {
        return $('~login');
    }

    get btnLogout() {
        return $('~logout');
    }

    // Métodos de ação
    async clickForms() {
        await this.btnForms.waitForDisplayed({ timeout: 5000 });
        await this.btnForms.click();
    }

    async clickSwipe() {
        await this.btnSwipe.waitForDisplayed({ timeout: 5000 });
        await this.btnSwipe.click();
    }

    async clickWebView() {
        await this.btnWebView.waitForDisplayed({ timeout: 5000 });
        await this.btnWebView.click();
    }

    async clickLogin() {
        await this.btnLogin.waitForDisplayed({ timeout: 5000 });
        await this.btnLogin.click();
    }

    async clickLogout() {
        await this.btnLogout.waitForDisplayed({ timeout: 5000 });
        await this.btnLogout.click();
    }

    async isWelcomeMessageDisplayed() {
        try {
            await this.txtWelcome.waitForDisplayed({ timeout: 5000 });
            return await this.txtWelcome.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async getWelcomeText() {
        if (await this.isWelcomeMessageDisplayed()) {
            return await this.txtWelcome.getText();
        }
        return '';
    }
}

module.exports = new HomePage();

