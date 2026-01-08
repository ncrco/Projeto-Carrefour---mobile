const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');
const DataHelper = require('../utils/DataHelper');

describe('Cenário 1: Login com credenciais válidas', () => {
    it('Deve realizar login com sucesso usando credenciais válidas', async () => {
        const user = DataHelper.getRandomUser();
        
        await LoginPage.login(user.username, user.password);
        
        const isWelcomeDisplayed = await HomePage.isWelcomeMessageDisplayed();
        expect(isWelcomeDisplayed).to.be.true;
    });
});

describe('Cenário 2: Login com credenciais inválidas', () => {
    it('Deve exibir mensagem de erro ao tentar fazer login com credenciais inválidas', async () => {
        await LoginPage.login('invaliduser', 'wrongpassword');
        
        const isErrorDisplayed = await LoginPage.isErrorMessageDisplayed();
        expect(isErrorDisplayed).to.be.true;
        
        const errorText = await LoginPage.getErrorMessageText();
        expect(errorText).to.not.be.empty;
    });
});

describe('Cenário 3: Login com campos vazios', () => {
    it('Deve exibir mensagem de erro ao tentar fazer login sem preencher os campos', async () => {
        await LoginPage.login('', '');
        
        const isErrorDisplayed = await LoginPage.isErrorMessageDisplayed();
        expect(isErrorDisplayed).to.be.true;
    });
});

