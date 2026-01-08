const LoginPage = require('../pages/LoginPage');
const SignUpPage = require('../pages/SignUpPage');
const DataHelper = require('../utils/DataHelper');

describe('Cenário 4: Cadastro de novo usuário', () => {
    it('Deve realizar cadastro com sucesso com dados válidos', async () => {
        const timestamp = Date.now();
        const username = `newuser${timestamp}`;
        const password = 'password123';
        
        await LoginPage.clickSignUp();
        await SignUpPage.signUp(username, password, password);
        
        const isSuccessDisplayed = await SignUpPage.isSuccessMessageDisplayed();
        expect(isSuccessDisplayed).to.be.true;
    });
});

describe('Cenário 5: Cadastro com senhas não coincidentes', () => {
    it('Deve exibir mensagem de erro quando as senhas não coincidem', async () => {
        const timestamp = Date.now();
        const username = `testuser${timestamp}`;
        
        await LoginPage.clickSignUp();
        await SignUpPage.signUp(username, 'password123', 'password456');
        
        const isErrorDisplayed = await SignUpPage.isErrorMessageDisplayed();
        expect(isErrorDisplayed).to.be.true;
        
        const errorText = await SignUpPage.getErrorMessageText();
        expect(errorText).to.include('password').or.include('senha').or.include('match');
    });
});

