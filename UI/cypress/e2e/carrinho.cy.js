import produtoPage from '../support/pages/produto.page'

describe('US-0001 - Adicionar item ao carrinho', () => {
  beforeEach(() => {
    produtoPage.acessarProduto('ingrid-running-jacket')
    produtoPage.selecionarTamanho('M')
    produtoPage.selecionarCor('White')
  })

  it('CT-01 - Deve adicionar um produto ao carrinho', () => {
    produtoPage.definirQuantidade(2)
    produtoPage.adicionarAoCarrinho()
    cy.visit('/carrinho/')
    cy.get('.woocommerce-cart-form .cart_item', { timeout: 15000 })
      .should('have.length.at.least', 1)
  })

  it('CT-03 - Deve permitir adicionar 10 itens do mesmo produto (valor limite)', () => {
    produtoPage.definirQuantidade(10)
    produtoPage.adicionarAoCarrinho()
    cy.visit('/carrinho/')
    cy.get('.woocommerce-cart-form .cart_item input.qty', { timeout: 15000 })
      .first()
      .should('have.value', '10')
  })
})
