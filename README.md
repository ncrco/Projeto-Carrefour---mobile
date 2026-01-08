# Automação de Testes Mobile - Native Demo App

Projeto de automação de testes mobile utilizando WebDriverIO, Appium e Mocha para testar o aplicativo native-demo-app.

## 📋 Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Execução dos Testes](#execução-dos-testes)
- [Relatórios](#relatórios)
- [CI/CD](#cicd)
- [BrowserStack](#browserstack)

## 🔧 Requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Java JDK** (versão 11 ou superior)
- **Android SDK** (para testes Android)
- **Xcode** (para testes iOS - apenas macOS)
- **Appium** (versão 2.x)
- **Emulador Android** ou **Simulador iOS** configurado

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd webdriverio-native-demo-automation
```

2. Instale as dependências:
```bash
npm install
```

3. Instale os drivers do Appium:
```bash
npm install -g appium@latest
appium driver install uiautomator2  # Para Android
appium driver install xcuitest      # Para iOS
```

4. Baixe o aplicativo native-demo-app:
   - Baixe o arquivo APK (Android) ou APP (iOS) do aplicativo
   - Coloque o arquivo na pasta `apps/` do projeto
   - Renomeie para `native-demo-app.apk` (Android) ou `native-demo-app.app` (iOS)

## ⚙️ Configuração

### Configuração do Ambiente

1. **Android:**
   - Configure a variável de ambiente `ANDROID_HOME`
   - Certifique-se de que o emulador Android está rodando ou conecte um dispositivo físico
   - Habilite o modo desenvolvedor e depuração USB no dispositivo

2. **iOS (apenas macOS):**
   - Configure o Xcode e os simuladores iOS
   - Certifique-se de que o simulador está disponível

### Configuração do Appium

Inicie o servidor Appium antes de executar os testes:

```bash
appium
```

O servidor estará disponível em `http://localhost:4723`

### Configuração do BrowserStack (Opcional)

1. Crie uma conta no [BrowserStack](https://www.browserstack.com/)
2. Faça upload do aplicativo no BrowserStack
3. Configure as variáveis de ambiente:

```bash
export BROWSERSTACK_USERNAME="seu_usuario"
export BROWSERSTACK_ACCESS_KEY="sua_chave"
export BROWSERSTACK_APP_ID_ANDROID="bs://app_id_android"
export BROWSERSTACK_APP_ID_IOS="bs://app_id_ios"
```

## 📁 Estrutura do Projeto

```
.
├── apps/                          # Aplicativos para teste
│   ├── native-demo-app.apk       # APK Android
│   └── native-demo-app.app       # APP iOS
├── test/
│   ├── data/                     # Arquivos de dados para data-driven testing
│   │   ├── users.json
│   │   ├── invalid_users.json
│   │   ├── form_data.json
│   │   └── test_data.csv
│   ├── pages/                    # Page Objects
│   │   ├── LoginPage.js
│   │   ├── SignUpPage.js
│   │   ├── HomePage.js
│   │   ├── FormsPage.js
│   │   └── SwipePage.js
│   ├── specs/                    # Testes
│   │   ├── login.test.js
│   │   ├── signup.test.js
│   │   ├── navigation.test.js
│   │   ├── forms.test.js
│   │   └── swipe.test.js
│   └── utils/                    # Utilitários
│       └── DataHelper.js
├── screenshots/                   # Screenshots capturados durante os testes
├── allure-results/                # Resultados do Allure
├── allure-report/                 # Relatório gerado do Allure
├── wdio.conf.js                   # Configuração principal WebDriverIO
├── wdio.android.conf.js           # Configuração Android
├── wdio.ios.conf.js               # Configuração iOS
├── wdio.browserstack.conf.js      # Configuração BrowserStack
├── .gitlab-ci.yml                 # Pipeline CI/CD
└── package.json
```

## 🚀 Execução dos Testes

### Executar todos os testes (Android padrão):
```bash
npm test
```

### Executar testes Android:
```bash
npm run test:android
```

### Executar testes iOS:
```bash
npm run test:ios
```

### Executar testes no BrowserStack:
```bash
npm run test:browserstack
```

### Executar um arquivo de teste específico:
```bash
npx wdio run wdio.conf.js --spec test/specs/login.test.js
```

## 📊 Relatórios

### Allure Report

O projeto está configurado para gerar relatórios detalhados usando Allure Report.

**Gerar relatório:**
```bash
npm run allure:generate
```

**Abrir relatório no navegador:**
```bash
npm run allure:open
```

**Servir relatório (modo servidor):**
```bash
npm run allure:serve
```

O relatório inclui:
- ✅ Resumo dos testes executados
- 📸 Screenshots das falhas
- 📝 Logs de execução
- 🔧 Informações sobre o ambiente de teste

### Screenshots

Screenshots são capturados automaticamente quando:
- Um teste falha
- Uma suíte de testes apresenta erro

Os screenshots são salvos na pasta `screenshots/` com o nome do teste e timestamp.

## 🔄 CI/CD

O projeto inclui configuração para GitLab CI/CD. O pipeline está definido no arquivo `.gitlab-ci.yml`.

### Estrutura do Pipeline

1. **test:android** - Executa testes Android
2. **test:ios** - Executa testes iOS
3. **generate:allure** - Gera relatório Allure

### Configuração no GitLab

1. Configure as variáveis de ambiente no GitLab (Settings > CI/CD > Variables)
2. Faça push do código para o repositório
3. O pipeline será executado automaticamente em commits e merge requests

### Executar Pipeline Manualmente

No GitLab, vá em CI/CD > Pipelines e clique em "Run Pipeline".

## ☁️ BrowserStack

Para executar testes em dispositivos reais no BrowserStack:

1. Configure as variáveis de ambiente (veja seção de configuração)
2. Faça upload do aplicativo no BrowserStack
3. Execute:
```bash
npm run test:browserstack
```

## 📝 Cenários de Teste

O projeto inclui os seguintes cenários de teste:

### Login/Cadastro
1. ✅ Login com credenciais válidas
2. ✅ Login com credenciais inválidas
3. ✅ Login com campos vazios
4. ✅ Cadastro de novo usuário
5. ✅ Cadastro com senhas não coincidentes

### Navegação
6. ✅ Navegação Home → Forms
7. ✅ Navegação Home → Swipe
8. ✅ Navegação de retorno Forms → Home

### Formulários
9. ✅ Preenchimento de formulário com dados válidos
10. ✅ Validação de formulário com campos obrigatórios vazios
11. ✅ Interação com switch toggle

### Swipe
12. ✅ Realizar swipe left nos cards

### Data-Driven Testing
13. ✅ Testes parametrizados com dados CSV

## 🛠️ Tecnologias Utilizadas

- **JavaScript** - Linguagem de programação
- **WebDriverIO** - Framework de automação
- **Appium** - Biblioteca para automação mobile
- **Mocha** - Gerenciador de testes
- **Chai** - Biblioteca de asserções
- **Allure Report** - Geração de relatórios
- **GitLab CI/CD** - Pipeline de integração contínua
- **BrowserStack** - Cloud de dispositivos (opcional)

## 📚 Padrões Implementados

### Page Object Pattern

O projeto utiliza o padrão Page Object para organizar os elementos da interface e ações:

- Cada página do aplicativo tem sua classe correspondente
- Elementos são encapsulados como propriedades
- Ações são implementadas como métodos

### Data-Driven Testing

Testes podem ser parametrizados usando:
- Arquivos JSON (`test/data/*.json`)
- Arquivos CSV (`test/data/*.csv`)

Utilize a classe `DataHelper` para carregar os dados.

## 🐛 Troubleshooting

### Problemas Comuns

1. **Appium não conecta ao dispositivo:**
   - Verifique se o Appium está rodando
   - Confirme que o dispositivo/emulador está conectado e acessível
   - Verifique as capabilities no arquivo de configuração

2. **Elementos não encontrados:**
   - Verifique os seletores (accessibility IDs) no código
   - Use o Appium Inspector para identificar os elementos corretos
   - Ajuste os timeouts se necessário

3. **Erro ao gerar relatório Allure:**
   - Certifique-se de que o Allure está instalado: `npm install -g allure-commandline`
   - Verifique se há resultados na pasta `allure-results/`

## 📄 Licença

Este projeto é fornecido "como está" para fins educacionais e de demonstração.

## 👥 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Nota:** Este projeto foi desenvolvido para fins educacionais e demonstração de boas práticas em automação de testes mobile.

