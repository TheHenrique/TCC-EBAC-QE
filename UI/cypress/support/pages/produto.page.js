// Page Object do produto e carrinho (WooCommerce).
class ProdutoPage {
  acessarLoja() {
    cy.visit('/loja/')
  }

  abrirPrimeiroProduto() {
    cy.get('ul.products li.product a.woocommerce-LoopProduct-link').first().click()
  }

  definirQuantidade(qtd) {
    cy.get('input.qty').clear().type(qtd)
  }

  adicionarAoCarrinho() {
    cy.get('button[name="add-to-cart"], button.single_add_to_cart_button').click()
  }
}

export default new ProdutoPage()
