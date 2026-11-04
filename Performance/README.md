# Testes de Performance (K6)

Teste de carga em 2 casos:
1. Carregar o catálogo de produtos (`/produtos/`).
2. **Autenticar na loja** com a massa de usuários de `usuarios.json`: o script abre a
   página de login (`/minha-conta/`), extrai o nonce do WooCommerce e envia usuário e
   senha, validando que o usuário ficou autenticado (presença do link de logout na resposta).

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

> Observação: as credenciais de `usuarios.json` precisam existir na loja em teste.
> O login do WooCommerce usa um nonce por sessão, por isso o script primeiro faz um GET
> na página de login e só então envia o POST com usuário e senha.
