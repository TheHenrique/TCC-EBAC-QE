import { $, $$ } from '@wdio/globals'

// Testing Pattern: Page Objects.
// US-0004 - Catálogo de produtos no app Android.
class CatalogoPage {
  get listaProdutos() { return $$('~product-item') }
  get primeiroProduto() { return $('~product-item') }
  get tituloProduto() { return $('~product-title') }

  async aguardarCatalogo() {
    await this.primeiroProduto.waitForDisplayed({ timeout: 30000 })
  }

  async abrirPrimeiroProduto() {
    await this.primeiroProduto.click()
  }
}

export default new CatalogoPage()
