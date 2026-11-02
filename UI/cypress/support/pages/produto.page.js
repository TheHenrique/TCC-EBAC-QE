// Page Object do produto e carrinho (WooCommerce com produtos variáveis).
class ProdutoPage {
  acessarProduto(slug = 'ingrid-running-jacket') {
    cy.visit(`/product/${slug}/`)
  }

  // Seleciona tamanho e cor pelos campos de variação do WooCommerce.
  // Usar os <select> (mesmo escondidos pelo tema) é mais estável que clicar nos swatches.
  selecionarTamanho(valor) {
    cy.get('.variations select').eq(0).select(valor, { force: true })
  }

  selecionarCor(valor) {
    cy.get('.variations select').eq(1).select(valor, { force: true })
  }

  definirQuantidade(qtd) {
    cy.get('input.qty').clear().type(qtd)
  }

  adicionarAoCarrinho() {
    // Espera o botão habilitar (variação válida escolhida) antes de clicar
    cy.get('button.single_add_to_cart_button').should('not.have.class', 'disabled').click()
  }
}

export default new ProdutoPage()
