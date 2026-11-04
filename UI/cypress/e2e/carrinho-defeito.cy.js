import produtoPage from '../support/pages/produto.page'

// CT-02 (cenário negativo) - Regra da US-0001:
// "Não é permitido inserir mais de 10 itens de um mesmo produto ao carrinho."
//
// A loja EBAC Shop NÃO aplica essa regra: ela aceita 11 itens no carrinho.
// Por isso este teste FALHA de propósito, documentando o defeito DEF-01.
// O Cypress gera automaticamente um screenshot da falha em cypress/screenshots,
// que serve como evidência do defeito.
//
// Este spec roda separado do pipeline principal (npm run test:defeito), para
// não derrubar os testes que passam. Veja docs/casos-de-teste.md (DEF-01).
describe('US-0001 - CT-02 - Limite de 10 itens (cenário negativo / DEF-01)', () => {
  it('Não deve permitir adicionar mais de 10 itens do mesmo produto', () => {
    produtoPage.acessarProduto('ingrid-running-jacket')
    produtoPage.selecionarTamanho('M')
    produtoPage.selecionarCor('White')
    produtoPage.definirQuantidade(11)
    produtoPage.adicionarAoCarrinho()
    cy.visit('/carrinho/')
    cy.get('.woocommerce-cart-form .cart_item input.qty', { timeout: 15000 })
      .first()
      .invoke('val')
      .then((quantidade) => {
        expect(
          Number(quantidade),
          'a quantidade no carrinho deveria respeitar o limite de 10 itens'
        ).to.be.at.most(10)
      })
  })
})
