const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');
const FormsPage = require('../pages/FormsPage');
const DataHelper = require('../utils/DataHelper');

describe('Cenário 9: Preenchimento de formulário com dados válidos', () => {
    it('Deve preencher e submeter formulário com sucesso', async () => {
        const user = DataHelper.getRandomUser();
        await LoginPage.login(user.username, user.password);
        
        await HomePage.clickForms();
        
        const formData = DataHelper.getFormData()[0];
        await FormsPage.fillForm(
            formData.text,
            formData.switchValue,
            formData.dropdownOption
        );
        
        await FormsPage.clickSubmit();
        
        const isSuccessDisplayed = await FormsPage.isSuccessMessageDisplayed();
        expect(isSuccessDisplayed).to.be.true;
    });
});

describe('Cenário 10: Validação de formulário com campos obrigatórios vazios', () => {
    it('Deve exibir mensagem de erro ao submeter formulário sem preencher campos obrigatórios', async () => {
        const user = DataHelper.getRandomUser();
        await LoginPage.login(user.username, user.password);
        
        await HomePage.clickForms();
        
        // Tentar submeter sem preencher o campo de texto
        await FormsPage.clickSubmit();
        
        const isErrorDisplayed = await FormsPage.isErrorMessageDisplayed();
        expect(isErrorDisplayed).to.be.true;
    });
});

describe('Cenário 11: Interação com switch toggle no formulário', () => {
    it('Deve alternar o estado do switch no formulário', async () => {
        const user = DataHelper.getRandomUser();
        await LoginPage.login(user.username, user.password);
        
        await HomePage.clickForms();
        
        const initialState = await FormsPage.isSwitchOn();
        await FormsPage.toggleSwitch();
        const newState = await FormsPage.isSwitchOn();
        
        expect(newState).to.not.equal(initialState);
    });
});

describe('Cenário 12: Data-driven testing com CSV', () => {
    const testData = DataHelper.getCSVTestData();
    
    for (let index = 0; index < testData.length; index++) {
        const data = testData[index];
        it(`Teste ${index + 1}: Login com dados do CSV - ${data.username}`, async () => {
            await LoginPage.login(data.username, data.password);
            
            if (data.expectedResult === 'success') {
                const isWelcomeDisplayed = await HomePage.isWelcomeMessageDisplayed();
                expect(isWelcomeDisplayed).to.be.true;
            } else {
                const isErrorDisplayed = await LoginPage.isErrorMessageDisplayed();
                expect(isErrorDisplayed).to.be.true;
            }
        });
    }
});

