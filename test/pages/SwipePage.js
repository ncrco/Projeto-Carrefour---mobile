const { $ } = require('@wdio/globals');

class SwipePage {
    // Elementos da página de swipe
    get cardContainer() {
        return $('~cardContainer');
    }

    get firstCard() {
        return $('~card1');
    }

    get secondCard() {
        return $('~card2');
    }

    get thirdCard() {
        return $('~card3');
    }

    get btnBack() {
        return $('~backButton');
    }

    // Métodos de ação
    async swipeLeft() {
        const card = await this.firstCard;
        await card.waitForDisplayed({ timeout: 5000 });
        const { x, y, width, height } = await card.getRect();
        const startX = x + width * 0.8;
        const endX = x + width * 0.2;
        const centerY = y + height / 2;
        
        await driver.touchAction([
            { action: 'press', x: startX, y: centerY },
            { action: 'wait', ms: 500 },
            { action: 'moveTo', x: endX, y: centerY },
            { action: 'release' }
        ]);
    }

    async swipeRight() {
        const card = await this.firstCard;
        await card.waitForDisplayed({ timeout: 5000 });
        const { x, y, width, height } = await card.getRect();
        const startX = x + width * 0.2;
        const endX = x + width * 0.8;
        const centerY = y + height / 2;
        
        await driver.touchAction([
            { action: 'press', x: startX, y: centerY },
            { action: 'wait', ms: 500 },
            { action: 'moveTo', x: endX, y: centerY },
            { action: 'release' }
        ]);
    }

    async isFirstCardDisplayed() {
        try {
            await this.firstCard.waitForDisplayed({ timeout: 3000 });
            return await this.firstCard.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async isSecondCardDisplayed() {
        try {
            await this.secondCard.waitForDisplayed({ timeout: 3000 });
            return await this.secondCard.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async clickBack() {
        await this.btnBack.waitForDisplayed({ timeout: 5000 });
        await this.btnBack.click();
    }
}

module.exports = new SwipePage();

