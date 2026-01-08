# Configuração de Variáveis de Ambiente

Para usar o BrowserStack, crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
BROWSERSTACK_USERNAME=seu_usuario_browserstack
BROWSERSTACK_ACCESS_KEY=sua_chave_de_acesso
BROWSERSTACK_APP_ID_ANDROID=bs://id_do_app_android
BROWSERSTACK_APP_ID_IOS=bs://id_do_app_ios
```

**Como obter as credenciais:**
1. Acesse https://www.browserstack.com/
2. Faça login na sua conta
3. Vá em Settings > Access Key para obter username e access key
4. Faça upload do aplicativo e obtenha o App ID

**Nota:** Não commite o arquivo `.env` no repositório. Ele está no `.gitignore`.

