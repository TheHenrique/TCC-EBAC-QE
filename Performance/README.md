# Testes de Performance (K6)

Teste de carga em 2 casos: carregar o catálogo e abrir a página de login.

Configuração (conforme o enunciado):
- 20 usuários virtuais
- 2 minutos de execução
- RampUp de 20 segundos
- Massa de usuários em `usuarios.json`

## Como rodar
1. Suba a loja (Docker local) em http://localhost.
2. Instale o K6 (https://k6.io).
3. Rode:
```
k6 run performance.test.js
```
O relatório é gerado em `report/performance.html`.
