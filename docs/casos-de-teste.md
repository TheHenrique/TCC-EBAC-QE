# Casos de teste

Legenda: **(A)** = caso automatizado.

## [US-0001] Adicionar item ao carrinho

Técnicas aplicadas: valor limite e partição de equivalência nas regras de quantidade e de valor.

| ID | Tipo | Técnica | Entrada | Resultado esperado |
|----|------|---------|---------|--------------------|
| CT-01 **(A)** | Feliz | Partição de equivalência | Adicionar 2 itens de um produto | Produto adicionado ao carrinho |
| CT-02 **(A)** | Alternativo/negativo | Valor limite | Adicionar 11 itens do mesmo produto | Mensagem de limite de 10 itens; produto não adicionado |
| CT-03 | Limite | Valor limite | Adicionar 10 itens do mesmo produto | Produto adicionado (limite exato permitido) |
| CT-04 | Negativo | Valor limite | Carrinho chegando a R$ 1.000,00 | Mensagem de limite de R$ 990,00; compra barrada |
| CT-05 | Alternativo | Partição de equivalência | Carrinho com R$ 400,00 | Cupom de 10% oferecido |
| CT-06 | Alternativo | Partição de equivalência | Carrinho com R$ 700,00 | Cupom de 15% oferecido |

## [US-0002] Login na plataforma

Técnicas aplicadas: tabela de decisão (usuário válido x senha válida) e partição de equivalência.

Tabela de decisão:

| Condição | R1 | R2 | R3 |
|----------|----|----|----|
| Usuário existe e está ativo | Sim | Sim | Não |
| Senha correta | Sim | Não | - |
| **Ação: acessar a conta** | X | | |
| **Ação: exibir mensagem de erro** | | X | X |

| ID | Tipo | Técnica | Entrada | Resultado esperado |
|----|------|---------|---------|--------------------|
| CT-07 **(A)** | Feliz | Tabela de decisão (R1) | Usuário ativo + senha correta | Acesso ao painel Minha Conta |
| CT-08 **(A)** | Negativo | Tabela de decisão (R2) | Usuário válido + senha errada | Mensagem de erro de login/senha |
| CT-09 | Negativo | Tabela de decisão (R3) | Usuário inexistente | Mensagem de erro de login/senha |
| CT-10 | Negativo | Valor limite | Errar a senha 3 vezes | Login bloqueado por 15 minutos |

## [US-0003] API de cupons

Técnicas aplicadas: partição de equivalência (requisição válida x inválida) e verificação de contrato.

| ID | Tipo | Técnica | Entrada | Resultado esperado |
|----|------|---------|---------|--------------------|
| CT-11 **(A)** | Feliz | Partição de equivalência | GET /coupons autenticado | 200 e lista de cupons (contrato válido) |
| CT-12 **(A)** | Feliz | Partição de equivalência | POST /coupons com campos obrigatórios | 201 e cupom criado (contrato válido) |
| CT-13 | Negativo | Partição de equivalência | POST /coupons com código já existente | Status de erro; cupom não duplicado |
| CT-14 | Negativo | Partição de equivalência | GET /coupons sem autenticação | 401 (não autorizado) |

## Resumo dos testes automatizados

- **UI:** CT-01 (feliz) e CT-02 (alternativo) de "Adicionar ao carrinho"; CT-07 (feliz) e CT-08 (negativo) de "Login".
- **API:** CT-11 (feliz) e CT-12 (feliz) com validação de contrato; CT-13 (negativo).
- **Mobile:** catálogo de produtos (caminho feliz: abrir a lista e um produto).
