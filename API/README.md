# Testes de API - Cupons (Supertest)

Testes da API de cupons da EBAC Shop (WooCommerce REST API), referente à história **US-0003**.

## Casos cobertos
- CT-11: listar cupons (GET) + contrato
- CT-12: cadastrar cupom (POST) + contrato
- GET por ID
- CT-13: código repetido (negativo)
- CT-14: acesso sem autenticação (negativo)

## Como rodar
1. Suba a loja (Docker local) ou use a loja online.
2. Ajuste, se necessário, `API_BASE_URL` e `API_COUPONS_PATH` em `config.js`.
3. Instale e rode:
```
npm install
npm test
```
O relatório é gerado em `report/index.html`.

> Observação: o caminho da API (`/wp-json/wc/v3/coupons`) deve ser confirmado no ambiente.
> A documentação da loja aponta para `/rest-api/docs/#/coupons`; se o endpoint base for
> `/rest-api`, ajuste `API_COUPONS_PATH` para `/rest-api/wc/v3/coupons`.
