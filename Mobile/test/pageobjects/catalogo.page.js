import { $ } from '@wdio/globals'

// Testing Pattern: Page Objects.
// US-0004 - Catálogo de produtos no app EBAC Shop (aplicativo do WooCommerce para Android,
// o mesmo usado no material oficial da EBAC - repositório testes-mobile-ebac-shop).
//
// SELETORES DE LOGIN: confirmados a partir do material oficial da EBAC.
// SELETORES DE CATÁLOGO (menuProdutos, primeiroProduto, tituloProduto): confirmar no
// Appium Inspector e ajustar se necessário (veja o README).
class CatalogoPage {
  // --- Tela inicial do app ---
  get botaoEntrarComEndereco() { return $('id:button_login_store') }

  // --- Tela de login da loja ---
  get campoEnderecoLoja() { return $('android.widget.EditText') }
  get botaoContinuar() { return $('id:bottom_button') }
  get entrarComCredenciais() { return $('id:login_site_creds') }
  get campoUsuario() { return $('android=new UiSelector().text("Username")') }
  get campoSenha() { return $('android=new UiSelector().text("Password")') }
  get botaoSenha2FA() { return $('id:login_enter_password') }

  // --- Loja / catálogo ---
  get logoLoja() { return $('~My store') }
  // Confirmar no Appium Inspector:
  get menuProdutos() { return $('android=new UiSelector().textContains("Products")') }
  get primeiroProduto() { return $('~product-item') }
  get tituloProduto() { return $('~product-title') }

  // Faz o login na loja seguindo o fluxo oficial da EBAC (app do WooCommerce).
  async login(urlLoja, usuario, senha) {
    await this.botaoEntrarComEndereco.click()
    await this.campoEnderecoLoja.setValue(urlLoja)
    await this.botaoContinuar.click()
    await this.entrarComCredenciais.click()
    await this.campoUsuario.setValue(usuario)
    await this.campoSenha.setValue(senha)
    await this.botaoContinuar.click()
    await this.botaoSenha2FA.click()
    await this.campoSenha.setValue(senha)
    await this.botaoContinuar.click()
  }

  async lojaExibida() {
    await this.logoLoja.waitForDisplayed({ timeout: 30000 })
    return this.logoLoja.isDisplayed()
  }

  async abrirCatalogo() {
    await this.menuProdutos.click()
  }

  async abrirPrimeiroProduto() {
    await this.primeiroProduto.waitForDisplayed({ timeout: 30000 })
    await this.primeiroProduto.click()
  }
}

export default new CatalogoPage()
