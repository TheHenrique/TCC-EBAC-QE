# Testes Mobile (WebdriverIO)

Testes do app **EBAC Shop** para Android (US-0004 – Catálogo de produtos).
O app é o aplicativo do **WooCommerce** (o mesmo do material oficial da EBAC).
Testing Pattern: **Page Objects**.

## Pré-requisitos
- Node.js, Appium (driver `uiautomator2`) e um emulador Android (ou dispositivo).
- APK do app em `app/loja-ebac.apk`.
- **App já logado na loja** (a sessão é mantida pelo app). O login é feito uma vez,
  manualmente, no emulador: abrir o app → "Enter your store address" →
  `http://lojaebac.ebaconline.art.br/` → "Continue with store credentials" → usuário e
  senha da loja da EBAC. Depois disso o teste parte do catálogo já carregado
  (`noReset: true` no `wdio.conf.js`).

## Como rodar
1. Suba o emulador e o Appium (`appium`).
2. Garanta que o app está logado (veja acima).
3. Rode:
```
npm install
npm test
```

## Cenário (catalogo.test.js)
- Aguarda o catálogo de produtos carregar (`productsRecycler`).
- Abre o primeiro produto (`productName`).
- Verifica que a tela de detalhes do produto é exibida (`productDetail_root`).

## Seletores (confirmados no Appium Inspector)
- Lista de produtos: `com.woocommerce.android:id/productsRecycler`
- Produto na lista: `com.woocommerce.android:id/productName`
- Tela de detalhes: `com.woocommerce.android:id/productDetail_root`
- Título do produto: `com.woocommerce.android:id/editText`

## Evidência
Após `npm test` passar, capture o print do terminal (cenário verde) e um print do app
com o produto aberto, para anexar no documento do TCC.
