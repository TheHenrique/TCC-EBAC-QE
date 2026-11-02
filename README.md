# TCC-EBAC-QE

Trabalho de Conclusão de Curso — Engenheiro de Qualidade de Software (EBAC).
Estratégia e automação de testes para o e-commerce **EBAC Shop**.

## Estrutura
```
UI/           Testes de interface (Cypress + Page Objects)
API/          Testes da API de cupons (Supertest + validação de contrato)
Mobile/       Testes do catálogo no Android (WebdriverIO + Page Objects)
Performance/  Teste de carga (K6)
docs/         Critérios de aceitação (Gherkin) e casos de teste
.github/      Integração contínua (GitHub Actions)
```

## Histórias de usuário
- US-0001 Adicionar item ao carrinho
- US-0002 Login na plataforma
- US-0003 API de cupons
- US-0004 a US-0008: Catálogo, Minha Conta, Meus Pedidos, Endereços, Detalhes da conta

## Como rodar a loja (Docker)
```
docker network create --attachable ebac-network
docker run -d --name wp_db -p 3306:3306 --network ebac-network ernestosbarbosa/lojaebacdb:latest
docker run -d --name wp -p 80:80 --network ebac-network ernestosbarbosa/lojaebac:latest
```
A loja fica em http://localhost. Cada pasta tem seu próprio README com os passos.
