# Resumo dos Cenários de Teste

Este documento lista todos os cenários de teste implementados no projeto.

## Total: 13 Cenários de Teste

### 🔐 Login/Cadastro (5 cenários)

#### Cenário 1: Login com credenciais válidas
- **Arquivo:** `test/specs/login.test.js`
- **Descrição:** Realiza login com sucesso usando credenciais válidas do arquivo JSON
- **Validação:** Verifica se a mensagem de boas-vindas é exibida

#### Cenário 2: Login com credenciais inválidas
- **Arquivo:** `test/specs/login.test.js`
- **Descrição:** Tenta fazer login com credenciais inválidas
- **Validação:** Verifica se mensagem de erro é exibida

#### Cenário 3: Login com campos vazios
- **Arquivo:** `test/specs/login.test.js`
- **Descrição:** Tenta fazer login sem preencher os campos
- **Validação:** Verifica se mensagem de erro é exibida

#### Cenário 4: Cadastro de novo usuário
- **Arquivo:** `test/specs/signup.test.js`
- **Descrição:** Realiza cadastro com sucesso usando dados válidos
- **Validação:** Verifica se mensagem de sucesso é exibida

#### Cenário 5: Cadastro com senhas não coincidentes
- **Arquivo:** `test/specs/signup.test.js`
- **Descrição:** Tenta cadastrar com senhas que não coincidem
- **Validação:** Verifica se mensagem de erro apropriada é exibida

### 🧭 Navegação (3 cenários)

#### Cenário 6: Navegação Home → Forms
- **Arquivo:** `test/specs/navigation.test.js`
- **Descrição:** Navega da tela Home para a tela Forms
- **Validação:** Verifica se o campo de input do formulário é exibido

#### Cenário 7: Navegação Home → Swipe
- **Arquivo:** `test/specs/navigation.test.js`
- **Descrição:** Navega da tela Home para a tela Swipe
- **Validação:** Verifica se o primeiro card é exibido

#### Cenário 8: Navegação de retorno Forms → Home
- **Arquivo:** `test/specs/navigation.test.js`
- **Descrição:** Retorna da tela Forms para a tela Home
- **Validação:** Verifica se a mensagem de boas-vindas é exibida

### 📝 Formulários (4 cenários)

#### Cenário 9: Preenchimento de formulário com dados válidos
- **Arquivo:** `test/specs/forms.test.js`
- **Descrição:** Preenche e submete formulário com dados válidos
- **Validação:** Verifica se mensagem de sucesso é exibida

#### Cenário 10: Validação de formulário com campos obrigatórios vazios
- **Arquivo:** `test/specs/forms.test.js`
- **Descrição:** Tenta submeter formulário sem preencher campos obrigatórios
- **Validação:** Verifica se mensagem de erro é exibida

#### Cenário 11: Interação com switch toggle
- **Arquivo:** `test/specs/forms.test.js`
- **Descrição:** Alterna o estado do switch no formulário
- **Validação:** Verifica se o estado do switch muda

#### Cenário 12: Data-driven testing com CSV
- **Arquivo:** `test/specs/forms.test.js`
- **Descrição:** Executa múltiplos testes de login usando dados do CSV
- **Validação:** Valida resultados esperados para cada conjunto de dados

### 👆 Swipe (1 cenário)

#### Cenário 13: Realizar swipe left nos cards
- **Arquivo:** `test/specs/swipe.test.js`
- **Descrição:** Realiza swipe left e navega para o próximo card
- **Validação:** Verifica se o segundo card é exibido após o swipe

## Cobertura de Funcionalidades

✅ **Login/Cadastro** - 5 cenários
✅ **Navegação entre telas** - 3 cenários  
✅ **Preenchimento de formulários** - 4 cenários
✅ **Verificação de mensagens de erro** - Integrado em múltiplos cenários
✅ **Swipe gestures** - 1 cenário

## Padrões Implementados

- ✅ **Page Object Pattern** - Todos os elementos e ações organizados em classes
- ✅ **Data-Driven Testing** - Testes parametrizados com JSON e CSV
- ✅ **Screenshots automáticos** - Captura em caso de falhas
- ✅ **Relatórios Allure** - Relatórios detalhados com evidências

