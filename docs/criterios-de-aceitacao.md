# Critérios de aceitação (Gherkin)

## [US-0001] Adicionar item ao carrinho

```gherkin
# language: pt
Funcionalidade: Adicionar item ao carrinho
  Como cliente da EBAC-SHOP
  Quero adicionar produtos no carrinho
  Para realizar a compra dos itens

  Cenário: Adicionar um produto ao carrinho
    Dado que eu esteja na página de um produto
    Quando eu informar a quantidade 2
    E clicar em "Comprar"
    Então o produto deve ser adicionado ao carrinho

  Cenário: Limite de 10 itens do mesmo produto
    Dado que eu esteja na página de um produto
    Quando eu informar a quantidade 11
    E clicar em "Comprar"
    Então deve ser exibida uma mensagem informando o limite de 10 itens
    E o produto não deve ser adicionado ao carrinho

  Cenário: Valor do carrinho não pode ultrapassar R$ 990,00
    Dado que eu tenha produtos no carrinho somando R$ 980,00
    Quando eu adicionar um produto de R$ 20,00
    Então deve ser exibida uma mensagem informando o limite de R$ 990,00
    E o produto não deve ser adicionado ao carrinho

  Cenário: Cupom de 10% para valores entre R$ 200 e R$ 600
    Dado que eu tenha produtos no carrinho somando R$ 400,00
    Quando eu acessar o carrinho
    Então deve ser oferecido um cupom de 10% de desconto

  Cenário: Cupom de 15% para valores acima de R$ 600
    Dado que eu tenha produtos no carrinho somando R$ 700,00
    Quando eu acessar o carrinho
    Então deve ser oferecido um cupom de 15% de desconto
```

## [US-0002] Login na plataforma

```gherkin
# language: pt
Funcionalidade: Login na plataforma
  Como cliente da EBAC-SHOP
  Quero fazer o login na plataforma
  Para visualizar meus pedidos

  Cenário: Login com usuário ativo e dados válidos
    Dado que eu esteja na página de login
    Quando eu informar um usuário ativo e a senha corretos
    E clicar em "Acessar"
    Então devo ser direcionado para a minha conta

  Cenário: Login com senha incorreta
    Dado que eu esteja na página de login
    Quando eu informar um usuário válido e uma senha incorreta
    E clicar em "Acessar"
    Então deve ser exibida uma mensagem de erro de login ou senha inválidos

  Cenário: Login com usuário inexistente
    Dado que eu esteja na página de login
    Quando eu informar um usuário que não existe
    E clicar em "Acessar"
    Então deve ser exibida uma mensagem de erro de login ou senha inválidos

  Cenário: Bloqueio após 3 tentativas erradas
    Dado que eu esteja na página de login
    Quando eu errar a senha 3 vezes seguidas
    Então o login deve ficar bloqueado por 15 minutos
```

## [US-0003] API de cupons

```gherkin
# language: pt
Funcionalidade: API de cupons
  Como admin da EBAC-SHOP
  Quero criar um serviço de cupom
  Para poder listar e cadastrar os cupons

  Cenário: Listar todos os cupons
    Dado que eu esteja autenticado como admin
    Quando eu fizer um GET em /coupons
    Então a resposta deve ter status 200
    E deve retornar a lista de cupons cadastrados

  Cenário: Buscar um cupom por ID
    Dado que eu esteja autenticado como admin
    Quando eu fizer um GET em /coupons/{id} de um cupom existente
    Então a resposta deve ter status 200
    E deve retornar os dados daquele cupom

  Cenário: Cadastrar um cupom com os campos obrigatórios
    Dado que eu esteja autenticado como admin
    Quando eu fizer um POST em /coupons com código, valor, tipo e descrição
    Então a resposta deve ter status 201
    E o cupom deve ser criado

  Cenário: Não cadastrar cupom com código repetido
    Dado que já exista um cupom com o código "Ganhe10"
    Quando eu fizer um POST em /coupons com o mesmo código
    Então a resposta deve ter status de erro
    E o cupom não deve ser duplicado
```

# Novas histórias de usuário

## [US-0004] Catálogo de produtos
Como cliente da EBAC-SHOP
Quero navegar pelo catálogo de produtos
Para encontrar os itens que desejo comprar

Critérios:
- Deve listar os produtos disponíveis na loja.
- Deve permitir buscar um produto pelo nome.
- Ao clicar em um produto, deve abrir a página com seus detalhes.
- Deve exibir o preço de cada produto.

## [US-0005] Painel Minha Conta
Como cliente da EBAC-SHOP
Quero acessar o painel Minha Conta
Para gerenciar minhas informações

Critérios:
- Após o login, deve exibir o painel Minha Conta.
- Deve mostrar os atalhos para Pedidos, Endereços e Detalhes da conta.
- Deve permitir sair da conta (logout).
- Um usuário não logado não deve acessar o painel.

## [US-0006] Meus Pedidos
Como cliente da EBAC-SHOP
Quero visualizar meus pedidos
Para acompanhar minhas compras

Critérios:
- Deve listar os pedidos do cliente.
- Deve exibir a data, o número e o status de cada pedido.
- Deve permitir ver os detalhes de um pedido.
- Se não houver pedidos, deve exibir uma mensagem informando.

## [US-0007] Endereços
Como cliente da EBAC-SHOP
Quero cadastrar e editar meus endereços
Para usá-los na entrega das compras

Critérios:
- Deve permitir cadastrar um endereço de entrega.
- Deve permitir editar um endereço já cadastrado.
- Deve validar os campos obrigatórios do endereço.
- Deve salvar as alterações e exibir uma confirmação.

## [US-0008] Detalhes da conta
Como cliente da EBAC-SHOP
Quero editar os detalhes da minha conta
Para manter meus dados atualizados

Critérios:
- Deve permitir alterar nome e e-mail.
- Deve permitir alterar a senha informando a senha atual.
- Deve validar os campos obrigatórios.
- Deve exibir uma mensagem de sucesso ao salvar.
