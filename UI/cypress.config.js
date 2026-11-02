const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Docker local: http://localhost | Loja online: http://lojaebac.ebaconline.art.br
    baseUrl: process.env.UI_BASE_URL || 'http://localhost',
    specPattern: 'cypress/e2e/**/*.cy.js',
    video: false,
    setupNodeEvents(on, config) {
      return config
    }
  },
  // Relatório em HTML (mochawesome)
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true
  }
})
