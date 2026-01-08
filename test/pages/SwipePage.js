const { $ } = require('@wdio/globals');
const BasePage = require('../utils/BasePage');
const SELECTORS = require('../config/selectors');
const CONSTANTS = require('../config/constants');

class SwipePage extends BasePage {
    // Elementos da página de swipe - parametrizados
    get cardContainer() {
        return $(SELECTORS.SWIPE.CARD_CONTAINER);
    }

    get firstCard() {
        return $(SELECTORS.SWIPE.FIRST_CARD);
    }

    get secondCard() {
        return $(SELECTORS.SWIPE.SECOND_CARD);
    }

    get thirdCard() {
        return $(SELECTORS.SWIPE.THIRD_CARD);
    }

    get btnBack() {
        return $(SELECTORS.SWIPE.BACK_BUTTON);
    }

    // Métodos de ação - usando métodos da classe base
    /**
     * Realiza swipe left
     * @param {number} duration - Duração do swipe em ms
     */
    async swipeLeft(duration = CONSTANTS.SWIPE_CONFIG.SWIPE_DURATION) {
        await this.waitForElement(this.firstCard);
        const { x, y, width, height } = await this.firstCard.getRect();
        
        const startX = x + width * CONSTANTS.SWIPE_CONFIG.SWIPE_START_PERCENT;
        const endX = x + width * CONSTANTS.SWIPE_CONFIG.SWIPE_END_PERCENT;
        const centerY = y + height * CONSTANTS.SWIPE_CONFIG.SWIPE_VERTICAL_CENTER;
        
        await driver.touchAction([
            { action: 'press', x: startX, y: centerY },
            { action: 'wait', ms: duration },
            { action: 'moveTo', x: endX, y: centerY },
            { action: 'release' }
        ]);
        
        await this.wait(CONSTANTS.TIMEOUTS.SHORT); // Aguarda animação
    }

    /**
     * Realiza swipe right
     * @param {number} duration - Duração do swipe em ms
     */
    async swipeRight(duration = CONSTANTS.SWIPE_CONFIG.SWIPE_DURATION) {
        await this.waitForElement(this.firstCard);
        const { x, y, width, height } = await this.firstCard.getRect();
        
        const startX = x + width * CONSTANTS.SWIPE_CONFIG.SWIPE_END_PERCENT;
        const endX = x + width * CONSTANTS.SWIPE_CONFIG.SWIPE_START_PERCENT;
        const centerY = y + height * CONSTANTS.SWIPE_CONFIG.SWIPE_VERTICAL_CENTER;
        
        await driver.touchAction([
            { action: 'press', x: startX, y: centerY },
            { action: 'wait', ms: duration },
            { action: 'moveTo', x: endX, y: centerY },
            { action: 'release' }
        ]);
        
        await this.wait(CONSTANTS.TIMEOUTS.SHORT); // Aguarda animação
    }

    /**
     * Verifica se primeiro card está exibido
     * @param {number} timeout - Timeout opcional
     * @returns {Promise<boolean>}
     */
    async isFirstCardDisplayed(timeout = CONSTANTS.TIMEOUTS.SHORT) {
        return await this.isElementDisplayed(this.firstCard, timeout);
    }

    /**
     * Verifica se segundo card está exibido
     * @param {number} timeout - Timeout opcional
     * @returns {Promise<boolean>}
     */
    async isSecondCardDisplayed(timeout = CONSTANTS.TIMEOUTS.SHORT) {
        return await this.isElementDisplayed(this.secondCard, timeout);
    }

    /**
     * Verifica se terceiro card está exibido
     * @param {number} timeout - Timeout opcional
     * @returns {Promise<boolean>}
     */
    async isThirdCardDisplayed(timeout = CONSTANTS.TIMEOUTS.SHORT) {
        return await this.isElementDisplayed(this.thirdCard, timeout);
    }

    /**
     * Navega para o próximo card
     */
    async navigateToNextCard() {
        await this.swipeLeft();
    }

    /**
     * Navega para o card anterior
     */
    async navigateToPreviousCard() {
        await this.swipeRight();
    }

    async clickBack() {
        await this.clickElement(this.btnBack);
    }
}

module.exports = new SwipePage();
