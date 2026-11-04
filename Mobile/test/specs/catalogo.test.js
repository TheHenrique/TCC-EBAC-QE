import { expect } from '@wdio/globals'
import catalogoPage from '../pageobjects/catalogo.page.js'

// Pré-requisito: o app EBAC Shop já deve estar logado na loja (a sessão é mantida pelo
// app). O teste usa noReset=true e parte do catálogo de produtos já carregado.
describe('US-0004 - Catálogo de produtos (app EBAC Shop)', () => {
  // Caminho feliz: o catálogo carrega e é possível abrir um produto.
  it('Deve exibir o catálogo e abrir um produto', async () => {
    await catalogoPage.aguardarCatalogo()
    await catalogoPage.abrirPrimeiroProduto()
    await expect(catalogoPage.telaDetalhe).toBeDisplayed()
  })
})
