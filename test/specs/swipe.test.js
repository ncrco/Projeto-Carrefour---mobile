const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');
const SwipePage = require('../pages/SwipePage');
const DataHelper = require('../utils/DataHelper');

describe('Cenário 13: Realizar swipe left nos cards', () => {
    it('Deve realizar swipe left e navegar para o próximo card', async () => {
        const user = DataHelper.getRandomUser();
        await LoginPage.login(user.username, user.password);
        
        await HomePage.clickSwipe();
        
        const firstCardVisible = await SwipePage.isFirstCardDisplayed();
        expect(firstCardVisible).to.be.true;
        
        await SwipePage.swipeLeft();
        
        // Aguardar animação
        await driver.pause(1000);
        
        const secondCardVisible = await SwipePage.isSecondCardDisplayed();
        expect(secondCardVisible).to.be.true;
    });
});

