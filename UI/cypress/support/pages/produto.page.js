// Page Object do produto e carrinho (WooCommerce com produtos variáveis).
class ProdutoPage {
  acessarProduto(slug = 'ingrid-running-jacket') {
    cy.visit(`/product/${slug}/`)
  }

  // Seleciona a variação (swatch) pelo valor, ex.: tamanho "M", cor "White"
  selecionarVariacao(valor) {
    cy.get(`[data-value="${valor}"]`).first().click()
  }

  definirQuantidade(qtd) {
    cy.get('input.qty').clear().type(qtd)
  }

  adicionarAoCarrinho() {
    cy.get('button.single_add_to_cart_button').click()
  }
}

export default new ProdutoPage()
