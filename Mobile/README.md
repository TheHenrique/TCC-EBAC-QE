# Testes Mobile (WebdriverIO)

Testes do app Android da EBAC Shop, apenas para **Catálogo de Produtos** (US-0004).
Testing Pattern: **Page Objects**.

## Pré-requisitos
- Node.js, Appium e um emulador Android (ou dispositivo) configurado.
- Baixe o APK em https://github.com/EBAC-QE/testes-mobile-ebac-shop/tree/main/app/android
  e salve como `app/ebac-shop.apk`.

## Como rodar
```
npm install
npm test
```

> Observação: os seletores (`~product-item`, `~product-title`) são os accessibility ids
> esperados. Ao rodar com o app real, confirme-os pelo Appium Inspector e ajuste no
> Page Object se necessário.
