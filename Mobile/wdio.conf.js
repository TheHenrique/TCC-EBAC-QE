// Configuração do WebdriverIO para Android (emulador/dispositivo local com Appium).
// Coloque o APK em app/ (veja o README) e ajuste o caminho em appium:app.
export const config = {
  runner: 'local',
  specs: ['./test/specs/**/*.js'],
  maxInstances: 1,
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android',
    'appium:app': new URL('./app/ebac-shop.apk', import.meta.url).pathname,
    'appium:autoGrantPermissions': true
  }],
  services: ['appium'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { ui: 'bdd', timeout: 120000 }
}
