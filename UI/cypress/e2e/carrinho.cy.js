import produtoPage from '../support/pages/produto.page'

describe('US-0001 - Adicionar item ao carrinho', () => {
  beforeEach(() => {
    produtoPage.acessarLoja()
    produtoPage.abrirPrimeiroProduto()
  })

  // CT-01: caminho feliz
  it('Deve adicionar um produto ao carrinho', () => {
    produtoPage.definirQuantidade(2)
    produtoPage.adicionarAoCarrinho()
    cy.contains('foi adicionado no seu carrinho').should('be.visible')
  })

  // CT-02: alternativo/negativo - limite de 10 itens
  it('Não deve permitir adicionar mais de 10 itens do mesmo produto', () => {
    produtoPage.definirQuantidade(11)
    produtoPage.adicionarAoCarrinho()
    // Regra de negócio: o sistema deve barrar acima de 10 itens
    cy.contains('foi adicionado no seu carrinho').should('not.exist')
  })
})
