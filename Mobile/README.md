# Testes Mobile (WebdriverIO)

Testes do app **EBAC Shop** para Android (US-0004 – Catálogo de produtos).
O app é o aplicativo do **WooCommerce** (o mesmo do material oficial da EBAC).
Testing Pattern: **Page Objects**.

## Pré-requisitos
- Node.js, Appium e um emulador Android (ou dispositivo) configurado.
- Baixe o APK do app (`loja-ebac.apk`) do material da EBAC e salve em `app/loja-ebac.apk`.

## Credenciais
O teste usa a loja e as credenciais do curso. Informe as suas por variável de ambiente
(ou edite `test/specs/catalogo.test.js`):
```
MOBILE_URL=http://lojaebac.ebaconline.art.br/
MOBILE_USER=seu_usuario
MOBILE_PASS=sua_senha
```

## Como rodar
```
npm install
npm test
```

## Confirmar os seletores no Appium Inspector
Os seletores de **login** já vêm confirmados pelo material oficial da EBAC. Os seletores
de **catálogo** (`menuProdutos`, `primeiroProduto`, `tituloProduto`, em
`test/pageobjects/catalogo.page.js`) precisam ser confirmados no seu app:

1. Suba o Appium e abra o **Appium Inspector**.
2. Use as mesmas capabilities do `wdio.conf.js` (platformName Android, UiAutomator2,
   caminho do APK, `appWaitActivity`) e inicie a sessão.
3. Faça o login na loja e navegue até a lista de produtos.
4. Toque em cada elemento (menu de Produtos, um produto da lista, o título do produto na
   tela de detalhes) e copie o **resource-id** ou o **accessibility id** mostrado pelo
   Inspector.
5. Substitua os seletores marcados como "confirmar" no Page Object pelos valores reais.

## Evidência
Após rodar com os seletores confirmados, capture a evidência:
- O resultado do `npm test` no terminal (cenário passando), e
- Um print da tela do app com o produto aberto (catálogo + detalhes do produto).

Guarde esses prints para anexar no documento do TCC.
