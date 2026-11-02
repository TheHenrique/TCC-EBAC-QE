import produtoPage from '../support/pages/produto.page'

describe('US-0001 - Adicionar item ao carrinho', () => {
  beforeEach(() => {
    // Produto variável: é preciso escolher tamanho e cor antes de comprar
    produtoPage.acessarProduto('ingrid-running-jacket')
    produtoPage.selecionarVariacao('M')      // tamanho
    produtoPage.selecionarVariacao('White')  // cor
  })

  // CT-01: caminho feliz
  it('Deve adicionar um produto ao carrinho', () => {
    produtoPage.definirQuantidade(2)
    produtoPage.adicionarAoCarrinho()
    cy.visit('/carrinho/')
    cy.get('.woocommerce-cart-form .cart_item').should('have.length.at.least', 1)
  })

  // CT-02: alternativo/negativo - limite de 10 itens
  it('Não deve permitir adicionar mais de 10 itens do mesmo produto', () => {
    produtoPage.definirQuantidade(11)
    produtoPage.adicionarAoCarrinho()
    cy.visit('/carrinho/')
    cy.get('body').then(($body) => {
      const quantidades = [...$body.find('.cart_item input.qty')].map((i) => Number(i.value))
      quantidades.forEach((q) => expect(q).to.be.at.most(10))
    })
  })
})
