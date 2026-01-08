# Guia de Configuração Rápida

Este guia fornece passos rápidos para configurar e executar os testes.

## Pré-requisitos Rápidos

1. **Node.js 18+** instalado
2. **Java JDK 11+** instalado
3. **Android SDK** configurado (para Android)
4. **Appium 2.x** instalado globalmente

## Passo a Passo

### 1. Instalar Dependências

```bash
npm install
```

### 2. Instalar Drivers do Appium

```bash
npm install -g appium@latest
appium driver install uiautomator2  # Android
appium driver install xcuitest      # iOS (macOS apenas)
```

### 3. Baixar o Aplicativo

- Baixe o `native-demo-app.apk` (Android) ou `.app` (iOS)
- Coloque na pasta `apps/`
- Renomeie para `native-demo-app.apk` ou `native-demo-app.app`

### 4. Iniciar Appium

Em um terminal separado:

```bash
appium
```

### 5. Preparar Dispositivo/Emulador

**Android:**
- Inicie um emulador Android OU
- Conecte um dispositivo físico com USB debugging habilitado

**iOS (macOS apenas):**
- Inicie um simulador iOS via Xcode

### 6. Executar Testes

```bash
# Todos os testes (Android padrão)
npm test

# Apenas Android
npm run test:android

# Apenas iOS
npm run test:ios
```

### 7. Ver Relatórios

```bash
# Gerar relatório
npm run allure:generate

# Abrir relatório
npm run allure:open
```

## Troubleshooting Rápido

**Erro: "Cannot find module"**
- Execute `npm install` novamente

**Erro: "Appium not running"**
- Certifique-se de que o Appium está rodando em outro terminal

**Erro: "Device not found"**
- Verifique se o emulador/dispositivo está conectado
- Execute `adb devices` (Android) para verificar

**Elementos não encontrados**
- Os seletores podem precisar ser ajustados conforme a versão do app
- Use Appium Inspector para identificar os elementos corretos

## Próximos Passos

Consulte o [README.md](README.md) para informações detalhadas sobre:
- Configuração avançada
- BrowserStack
- CI/CD
- Estrutura do projeto

