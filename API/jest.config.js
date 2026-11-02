module.exports = {
  // Gera o relatório em HTML na pasta report/
  reporters: [
    'default',
    ['jest-html-reporters', { publicPath: 'report', filename: 'index.html', pageTitle: 'Relatório API - Cupons' }]
  ]
}
