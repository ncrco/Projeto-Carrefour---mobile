/**
 * Classe base para Page Objects
 * Boas práticas: DRY (Don't Repeat Yourself) - código reutilizável
 */

const { $ } = require('@wdio/globals');
const CONSTANTS = require('../config/constants');

class BasePage {
    /**
     * Aguarda elemento ser exibido
     * @param {WebdriverIO.Element} element - Elemento a ser aguardado
     * @param {number} timeout - Timeout em milissegundos
     * @returns {Promise<boolean>}
     */
    async waitForElement(element, timeout = CONSTANTS.TIMEOUTS.ELEMENT_WAIT) {
        try {
            await element.waitForDisplayed({ timeout });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Aguarda elemento ser clicável
     * @param {WebdriverIO.Element} element - Elemento a ser aguardado
     * @param {number} timeout - Timeout em milissegundos
     * @returns {Promise<boolean>}
     */
    async waitForClickable(element, timeout = CONSTANTS.TIMEOUTS.ELEMENT_WAIT) {
        try {
            await element.waitForClickable({ timeout });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Clica em um elemento com tratamento de erro
     * @param {WebdriverIO.Element} element - Elemento a ser clicado
     * @param {number} timeout - Timeout em milissegundos
     * @throws {Error} Se o elemento não for encontrado ou clicável
     */
    async clickElement(element, timeout = CONSTANTS.TIMEOUTS.ELEMENT_WAIT) {
        const isDisplayed = await this.waitForElement(element, timeout);
        if (!isDisplayed) {
            throw new Error(`Elemento não encontrado após ${timeout}ms`);
        }

        const isClickable = await this.waitForClickable(element, timeout);
        if (!isClickable) {
            throw new Error(`Elemento não está clicável após ${timeout}ms`);
        }

        await element.click();
    }

    /**
     * Preenche campo de texto
     * @param {WebdriverIO.Element} element - Elemento a ser preenchido
     * @param {string} value - Valor a ser inserido
     * @param {number} timeout - Timeout em milissegundos
     * @throws {Error} Se o elemento não for encontrado
     */
    async setValue(element, value, timeout = CONSTANTS.TIMEOUTS.ELEMENT_WAIT) {
        const isDisplayed = await this.waitForElement(element, timeout);
        if (!isDisplayed) {
            throw new Error(`Elemento não encontrado após ${timeout}ms`);
        }

        await element.clearValue();
        await element.setValue(value);
    }

    /**
     * Obtém texto de um elemento
     * @param {WebdriverIO.Element} element - Elemento
     * @param {number} timeout - Timeout em milissegundos
     * @returns {Promise<string>}
     */
    async getText(element, timeout = CONSTANTS.TIMEOUTS.ELEMENT_WAIT) {
        const isDisplayed = await this.waitForElement(element, timeout);
        if (!isDisplayed) {
            return '';
        }
        return await element.getText();
    }

    /**
     * Verifica se elemento está exibido
     * @param {WebdriverIO.Element} element - Elemento
     * @param {number} timeout - Timeout em milissegundos
     * @returns {Promise<boolean>}
     */
    async isElementDisplayed(element, timeout = CONSTANTS.TIMEOUTS.SHORT) {
        try {
            await element.waitForDisplayed({ timeout });
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Aguarda um tempo específico
     * @param {number} ms - Milissegundos
     * @returns {Promise<void>}
     */
    async wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Tira screenshot
     * @param {string} name - Nome do screenshot
     * @returns {Promise<string>} Caminho do arquivo
     */
    async takeScreenshot(name) {
        const timestamp = Date.now();
        const filename = `${CONSTANTS.TEST_CONFIG.SCREENSHOT_PATH}/${name}_${timestamp}.${CONSTANTS.REPORT_CONFIG.SCREENSHOT_FORMAT}`;
        await driver.saveScreenshot(filename);
        return filename;
    }

    /**
     * Scroll até elemento
     * @param {WebdriverIO.Element} element - Elemento alvo
     * @param {string} direction - Direção do scroll (up, down, left, right)
     */
    async scrollToElement(element, direction = 'down') {
        await element.scrollIntoView();
    }

    /**
     * Verifica se texto contém alguma das palavras-chave
     * @param {string} text - Texto a ser verificado
     * @param {string[]} keywords - Palavras-chave
     * @returns {boolean}
     */
    containsKeywords(text, keywords) {
        const lowerText = text.toLowerCase();
        return keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
    }
}

module.exports = BasePage;

