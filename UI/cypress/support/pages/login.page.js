// Testing Pattern usado: Page Objects.
// Página de login do WooCommerce (Minha conta).
class LoginPage {
  acessar() {
    cy.visit('/minha-conta/')
  }

  preencher(usuario, senha) {
    cy.get('#username').clear().type(usuario)
    cy.get('#password').clear().type(senha, { log: false })
  }

  entrar() {
    // Nesta loja o botão de login é um input de submit (name="login")
    cy.get('input[name="login"]').click()
  }

  login(usuario, senha) {
    this.preencher(usuario, senha)
    this.entrar()
  }
}

export default new LoginPage()
