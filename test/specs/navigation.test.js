const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');
const FormsPage = require('../pages/FormsPage');
const SwipePage = require('../pages/SwipePage');
const DataHelper = require('../utils/DataHelper');

describe('Cenário 6: Navegação entre telas - Home para Forms', () => {
    it('Deve navegar da tela Home para a tela Forms', async () => {
        const user = DataHelper.getRandomUser();
        await LoginPage.login(user.username, user.password);
        
        await HomePage.clickForms();
        
        const isFormInputDisplayed = await FormsPage.inputText.isDisplayed();
        expect(isFormInputDisplayed).to.be.true;
    });
});

describe('Cenário 7: Navegação entre telas - Home para Swipe', () => {
    it('Deve navegar da tela Home para a tela Swipe', async () => {
        const user = DataHelper.getRandomUser();
        await LoginPage.login(user.username, user.password);
        
        await HomePage.clickSwipe();
        
        const isCardDisplayed = await SwipePage.isFirstCardDisplayed();
        expect(isCardDisplayed).to.be.true;
    });
});

describe('Cenário 8: Navegação de retorno - Forms para Home', () => {
    it('Deve retornar da tela Forms para a tela Home', async () => {
        const user = DataHelper.getRandomUser();
        await LoginPage.login(user.username, user.password);
        
        await HomePage.clickForms();
        await FormsPage.clickBack();
        
        const isWelcomeDisplayed = await HomePage.isWelcomeMessageDisplayed();
        expect(isWelcomeDisplayed).to.be.true;
    });
});

