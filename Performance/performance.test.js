import http from 'k6/http'
import { check, sleep } from 'k6'
import { SharedArray } from 'k6/data'

// Massa de usuários fornecida na história
const usuarios = new SharedArray('usuarios', () => JSON.parse(open('./usuarios.json')))

// Base da loja (Docker local por padrão)
const BASE_URL = __ENV.BASE_URL || 'http://localhost'

export const options = {
  stages: [
    { duration: '20s', target: 20 }, // RampUp: sobe até 20 usuários em 20s
    { duration: '2m', target: 20 }   // mantém 20 usuários virtuais por 2 minutos
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% das respostas abaixo de 2s
    http_req_failed: ['rate<0.05']     // menos de 5% de falhas
  }
}

export default function () {
  // Caso 1: carregar o catálogo de produtos (página da loja)
  const loja = http.get(`${BASE_URL}/loja/`)
  check(loja, { 'catálogo responde 200': (r) => r.status === 200 })

  // Caso 2: abrir a página de login (Minha conta)
  const usuario = usuarios[Math.floor(Math.random() * usuarios.length)]
  const login = http.get(`${BASE_URL}/minha-conta/`)
  check(login, { 'página de login responde 200': (r) => r.status === 200 })

  sleep(1)
}

// Gera o relatório em HTML ao final (summary export)
export function handleSummary(data) {
  return {
    'report/performance.html': htmlReport(data),
    stdout: textSummary(data)
  }
}

// Relatório simples em HTML a partir do resumo do k6
function htmlReport(data) {
  const m = data.metrics
  const linha = (nome, v) => `<tr><td>${nome}</td><td>${v}</td></tr>`
  return `<!doctype html><html lang="pt-br"><meta charset="utf-8">
<title>Relatório de Performance - EBAC Shop</title>
<body style="font-family:Arial;margin:40px">
<h1>Relatório de Performance - EBAC Shop (K6)</h1>
<table border="1" cellpadding="8" cellspacing="0">
${linha('Requisições totais', m.http_reqs ? m.http_reqs.values.count : '-')}
${linha('Falhas (%)', m.http_req_failed ? (m.http_req_failed.values.rate * 100).toFixed(2) : '-')}
${linha('Duração média (ms)', m.http_req_duration ? m.http_req_duration.values.avg.toFixed(0) : '-')}
${linha('Duração p95 (ms)', m.http_req_duration ? m.http_req_duration.values['p(95)'].toFixed(0) : '-')}
</table></body></html>`
}

function textSummary(data) {
  const m = data.metrics
  return `\nRequisições: ${m.http_reqs.values.count} | Falhas: ${(m.http_req_failed.values.rate*100).toFixed(2)}% | p95: ${m.http_req_duration.values['p(95)'].toFixed(0)}ms\n`
}
