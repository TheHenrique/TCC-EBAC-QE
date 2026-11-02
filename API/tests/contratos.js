const Joi = require('joi')

// Contrato de um cupom retornado pela API (campos principais)
const cupomSchema = Joi.object({
  id: Joi.number().required(),
  code: Joi.string().required(),
  amount: Joi.string().required(),
  discount_type: Joi.string().required(),
  description: Joi.string().allow('').required()
}).unknown(true) // a API devolve mais campos; validamos só os que importam

// A listagem é um array de cupons
const listaCuponsSchema = Joi.array().items(cupomSchema)

module.exports = { cupomSchema, listaCuponsSchema }
