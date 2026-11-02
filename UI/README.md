# Testes de UI (Cypress)

Testes de interface da EBAC Shop. Testing Pattern: **Page Objects**.

## Casos cobertos
- CT-07: login com dados válidos (caminho feliz)
- CT-08: login com senha inválida (negativo)
- CT-01: adicionar produto ao carrinho (caminho feliz)
- CT-02: limite de 10 itens (alternativo/negativo)

## Como rodar
1. Suba a loja (Docker local) em http://localhost.
2. Se a loja estiver em outro endereço, use `UI_BASE_URL`.
3. Instale e rode:
```
npm install
npm test
```
Para gerar o relatório em HTML depois de rodar:
```
npx mochawesome-merge "cypress/reports/*.json" > relatorio.json
npx marge relatorio.json --reportDir cypress/reports/html --reportFilename index
```

> Observação: os seletores seguem o padrão do WooCommerce. Ao rodar contra a sua loja,
> confirme-os (abrindo o Cypress com `npm run cy:open`) e ajuste nos Page Objects se preciso.
