import { $ } from '@wdio/globals'

// Testing Pattern: Page Objects.
// US-0004 - Catálogo de produtos no app EBAC Shop (aplicativo do WooCommerce para Android).
// Seletores confirmados no Appium Inspector.
class CatalogoPage {
  // Aba "Products" na barra inferior (o app abre no painel "My store", então navegamos até ela)
  get menuProdutos() {
    return $('android=new UiSelector().resourceId("com.woocommerce.android:id/products")')
  }

  // Lista de produtos (catálogo)
  get listaProdutos() {
    return $('android=new UiSelector().resourceId("com.woocommerce.android:id/productsRecycler")')
  }

  // Nome de um produto na lista (usado para abrir o primeiro produto)
  get primeiroProduto() {
    return $('android=new UiSelector().resourceId("com.woocommerce.android:id/productName")')
  }

  // Tela de detalhes do produto
  get telaDetalhe() {
    return $('android=new UiSelector().resourceId("com.woocommerce.android:id/productDetail_root")')
  }

  // Título do produto na tela de detalhes
  get tituloProduto() {
    return $('android=new UiSelector().resourceId("com.woocommerce.android:id/editText")')
  }

  // Garante que estamos na aba Products e espera o catálogo carregar.
  async aguardarCatalogo() {
    await this.menuProdutos.waitForExist({ timeout: 30000 })
    await this.menuProdutos.click()
    await this.listaProdutos.waitForDisplayed({ timeout: 30000 })
  }

  async abrirPrimeiroProduto() {
    await this.primeiroProduto.waitForDisplayed({ timeout: 30000 })
    await this.primeiroProduto.click()
  }
}

export default new CatalogoPage()
