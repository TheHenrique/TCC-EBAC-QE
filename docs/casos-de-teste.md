# Casos de teste

Legenda: **(A)** = caso automatizado.

## [US-0001] Adicionar item ao carrinho

Técnicas aplicadas: valor limite e partição de equivalência nas regras de quantidade e de valor.

| ID | Tipo | Técnica | Entrada | Resultado esperado |
|----|------|---------|---------|--------------------|
| CT-01 **(A)** | Feliz | Partição de equivalência | Adicionar 2 itens de um produto | Produto adicionado ao carrinho |
| CT-02 **(A)** | Alternativo/negativo | Valor limite | Adicionar 11 itens do mesmo produto | Produto limitado a 10 itens; o 11º não deve ser aceito. **Obs.: a loja não aplica essa regra — ver defeito DEF-01.** |
| CT-03 **(A)** | Limite | Valor limite | Adicionar 10 itens do mesmo produto | Produto adicionado (limite exato permitido) |
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
| CT-13 **(A)** | Negativo | Partição de equivalência | POST /coupons com código já existente | 400 e código de erro `woocommerce_rest_coupon_code_already_exists`; cupom não duplicado |
| CT-14 **(A)** | Negativo | Partição de equivalência | GET /coupons sem autenticação | 401 (não autorizado) |

## [US-0004] Catálogo de produtos

Técnicas aplicadas: partição de equivalência (termo existente x inexistente).

| ID | Tipo | Técnica | Entrada | Resultado esperado |
|----|------|---------|---------|--------------------|
| CT-15 **(A)** | Feliz | Partição de equivalência | No app EBAC Shop (sessão já autenticada), abrir o catálogo e tocar no primeiro produto | Catálogo exibido e a página de detalhes do produto é aberta |
| CT-16 | Feliz | Partição de equivalência | Buscar "jacket" no campo de busca da loja | Retorna os produtos cujo nome contém "jacket" |
| CT-17 | Feliz | Partição de equivalência | Acessar a página `/produtos/` | Cada produto exibe nome e preço |
| CT-18 | Negativo | Partição de equivalência | Buscar por um termo inexistente ("xyzabc123") | Mensagem informando que nenhum produto foi encontrado |

## [US-0005] Painel Minha Conta

Técnicas aplicadas: partição de equivalência (logado x não logado).

| ID | Tipo | Técnica | Entrada | Resultado esperado |
|----|------|---------|---------|--------------------|
| CT-19 | Feliz | Tabela de decisão | Após login válido, acessar `/minha-conta/` | Painel Minha Conta exibido |
| CT-20 | Feliz | Partição de equivalência | Estando no painel Minha Conta | Atalhos para Pedidos, Endereços e Detalhes da conta visíveis |
| CT-21 | Feliz | Partição de equivalência | Clicar em "Sair" (logout) | Sessão encerrada; usuário volta para a tela de login |
| CT-22 | Negativo | Partição de equivalência | Acessar `/minha-conta/` sem estar logado | Redirecionado para a página de login |

## [US-0006] Meus Pedidos

Técnicas aplicadas: partição de equivalência (cliente com pedidos x sem pedidos).

| ID | Tipo | Técnica | Entrada | Resultado esperado |
|----|------|---------|---------|--------------------|
| CT-23 | Feliz | Partição de equivalência | Acessar "Pedidos" com um cliente que possui pedidos | Lista de pedidos exibida |
| CT-24 | Feliz | Partição de equivalência | Visualizar a lista de pedidos | Exibe data, número e status de cada pedido |
| CT-25 | Feliz | Partição de equivalência | Clicar em "Ver" um pedido | Página com os detalhes do pedido é aberta |
| CT-26 | Alternativo | Partição de equivalência | Acessar "Pedidos" com um cliente sem compras | Mensagem informando que não há pedidos |

## [US-0007] Endereços

Técnicas aplicadas: partição de equivalência e valor limite nos campos obrigatórios.

| ID | Tipo | Técnica | Entrada | Resultado esperado |
|----|------|---------|---------|--------------------|
| CT-27 | Feliz | Partição de equivalência | Cadastrar endereço de entrega com todos os campos válidos | Endereço salvo e confirmação exibida |
| CT-28 | Feliz | Partição de equivalência | Editar um endereço já cadastrado | Alterações salvas e confirmação exibida |
| CT-29 | Negativo | Partição de equivalência | Salvar endereço com um campo obrigatório vazio (ex.: CEP) | Mensagem de validação do campo obrigatório |
| CT-30 | Negativo | Valor limite | Informar um CEP com formato inválido | Mensagem informando CEP inválido |

## [US-0008] Detalhes da conta

Técnicas aplicadas: tabela de decisão (senha atual correta x incorreta) e partição de equivalência.

| ID | Tipo | Técnica | Entrada | Resultado esperado |
|----|------|---------|---------|--------------------|
| CT-31 | Feliz | Partição de equivalência | Alterar nome e e-mail com dados válidos | Dados salvos e mensagem de sucesso |
| CT-32 | Feliz | Tabela de decisão | Alterar a senha informando a senha atual correta e uma nova senha | Senha alterada com sucesso |
| CT-33 | Negativo | Tabela de decisão | Alterar a senha informando a senha atual incorreta | Mensagem de erro (senha atual incorreta) |
| CT-34 | Negativo | Partição de equivalência | Salvar com e-mail em formato inválido | Mensagem de validação do e-mail |

## Defeitos encontrados

| ID | História | Severidade | Descrição | Evidência |
|----|----------|-----------|-----------|-----------|
| DEF-01 | US-0001 | Média | A loja aceita adicionar **11 itens** do mesmo produto ao carrinho, descumprindo a regra de negócio "não é permitido inserir mais de 10 itens de um mesmo produto". O caso CT-02 (cenário negativo automatizado) verifica o limite de 10 e falha, comprovando o defeito. | Screenshot gerado automaticamente pelo Cypress em `UI/cypress/screenshots/` ao rodar `npm run test:defeito`. |

## Resumo dos testes automatizados

- **UI:** CT-01 (feliz) e CT-03 (valor limite — 10 itens) de "Adicionar ao carrinho", ambos verdes; CT-07 (feliz) e CT-08 (negativo) de "Login". O CT-02 (cenário negativo — 11 itens) roda em separado (`npm run test:defeito`) e evidencia o defeito DEF-01.
- **API:** CT-11 e CT-12 (feliz) com validação de contrato; CT-13 (negativo — valida status 400 e o código de erro específico de duplicidade); CT-14 (negativo — exige autenticação).
- **Mobile:** catálogo de produtos (US-0004, CT-15) com Page Objects no app Android.
