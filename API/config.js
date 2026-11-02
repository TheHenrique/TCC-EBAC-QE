// Dados de acesso e base da API de cupons (WooCommerce REST API)
// Ajuste BASE_URL conforme onde a loja está rodando:
//  - Docker local: http://localhost
//  - Loja online:  http://lojaebac.ebaconline.art.br
module.exports = {
  baseUrl: process.env.API_BASE_URL || 'http://localhost',
  // Caminho da API de cupons na documentação: /wc/v3/coupons
  couponsPath: process.env.API_COUPONS_PATH || '/wp-json/wc/v3/coupons',
  // Autenticação Basic informada na história US-0003
  authorization: 'Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy'
}
