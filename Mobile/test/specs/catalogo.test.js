import { expect } from '@wdio/globals'
import catalogoPage from '../pageobjects/catalogo.page.js'

// Loja e credenciais da EBAC (use as do curso). Podem ser sobrescritas por variável de ambiente.
const URL_LOJA = process.env.MOBILE_URL || 'http://lojaebac.ebaconline.art.br/'
const USUARIO = process.env.MOBILE_USER || 'gerente'
const SENHA = process.env.MOBILE_PASS || ''

describe('US-0004 - Catálogo de produtos (app EBAC Shop)', () => {
  // Caminho feliz: autentica na loja, abre o catálogo e abre um produto.
  it('Deve autenticar na loja e abrir um produto do catálogo', async () => {
    await catalogoPage.login(URL_LOJA, USUARIO, SENHA)
    expect(await catalogoPage.lojaExibida()).toBe(true)

    await catalogoPage.abrirCatalogo()
    await catalogoPage.abrirPrimeiroProduto()
    await expect(catalogoPage.tituloProduto).toBeDisplayed()
  })
})
