import loginPage from '../support/pages/login.page'

describe('US-0002 - Login na plataforma', () => {
  beforeEach(() => {
    loginPage.acessar()
  })

  // CT-07: caminho feliz
  it('Deve fazer login com usuário ativo e senha válidos', () => {
    cy.fixture('usuario').then((dados) => {
      loginPage.login(dados.valido.usuario, dados.valido.senha)
      // Após o login, o WooCommerce mostra o painel Minha conta
      cy.contains('Painel').should('be.visible')
    })
  })

  // CT-08: negativo
  it('Deve exibir mensagem de erro com senha inválida', () => {
    cy.fixture('usuario').then((dados) => {
      loginPage.login(dados.senhaInvalida.usuario, dados.senhaInvalida.senha)
      cy.get('.woocommerce-error').should('be.visible')
    })
  })
})
