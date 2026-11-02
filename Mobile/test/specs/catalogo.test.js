import { expect } from '@wdio/globals'
import catalogoPage from '../pageobjects/catalogo.page.js'

describe('US-0004 - Catálogo de produtos (Android)', () => {
  // Caminho feliz: o catálogo carrega e é possível abrir um produto
  it('Deve exibir a lista de produtos e abrir um produto', async () => {
    await catalogoPage.aguardarCatalogo()
    const total = await catalogoPage.listaProdutos.length
    expect(total).toBeGreaterThan(0)

    await catalogoPage.abrirPrimeiroProduto()
    await expect(catalogoPage.tituloProduto).toBeDisplayed()
  })
})
