const request = require('supertest')
const { baseUrl, couponsPath, authorization } = require('../config')
const { cupomSchema, listaCuponsSchema } = require('./contratos')

const api = request(baseUrl)

describe('API de cupons - EBAC Shop', () => {
  let cupomCriadoId
  const codigoUnico = `tcc${Date.now()}` // código novo a cada execução, para não repetir

  // CT-12: cadastrar um cupom com os campos obrigatórios (caminho feliz)
  it('POST /coupons - deve cadastrar um cupom com os campos obrigatórios', async () => {
    const resposta = await api.post(couponsPath)
      .set('Authorization', authorization)
      .send({
        code: codigoUnico,
        amount: '10',
        discount_type: 'fixed_product',
        description: 'Cupom de desconto de teste'
      })

    expect(resposta.statusCode).toBe(201)
    expect(resposta.body.code).toBe(codigoUnico)

    // Validação de contrato
    const { error } = cupomSchema.validate(resposta.body)
    expect(error).toBeUndefined()

    cupomCriadoId = resposta.body.id
  })

  // CT-11: listar todos os cupons (caminho feliz) + contrato
  it('GET /coupons - deve listar os cupons cadastrados', async () => {
    const resposta = await api.get(couponsPath)
      .set('Authorization', authorization)

    expect(resposta.statusCode).toBe(200)
    expect(Array.isArray(resposta.body)).toBe(true)

    const { error } = listaCuponsSchema.validate(resposta.body)
    expect(error).toBeUndefined()
  })

  // GET por ID do cupom recém-criado
  it('GET /coupons/{id} - deve buscar um cupom pelo ID', async () => {
    const resposta = await api.get(`${couponsPath}/${cupomCriadoId}`)
      .set('Authorization', authorization)

    expect(resposta.statusCode).toBe(200)
    expect(resposta.body.id).toBe(cupomCriadoId)

    const { error } = cupomSchema.validate(resposta.body)
    expect(error).toBeUndefined()
  })

  // CT-13: não cadastrar cupom com código repetido (negativo)
  it('POST /coupons - não deve cadastrar cupom com código repetido', async () => {
    const resposta = await api.post(couponsPath)
      .set('Authorization', authorization)
      .send({
        code: codigoUnico, // mesmo código do primeiro teste
        amount: '10',
        discount_type: 'fixed_product',
        description: 'Cupom duplicado'
      })

    expect(resposta.statusCode).toBeGreaterThanOrEqual(400)
  })

  // CT-14: não permitir acesso sem autenticação (negativo)
  it('GET /coupons - deve exigir autenticação', async () => {
    const resposta = await api.get(couponsPath) // sem o header Authorization
    expect(resposta.statusCode).toBe(401)
  })

  // Remove o cupom criado, para não deixar lixo na loja
  afterAll(async () => {
    if (cupomCriadoId) {
      await api.delete(`${couponsPath}/${cupomCriadoId}?force=true`)
        .set('Authorization', authorization)
    }
  })
})
