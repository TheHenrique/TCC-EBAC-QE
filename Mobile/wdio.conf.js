// Configuração do WebdriverIO para Android (emulador/dispositivo local com Appium).
// App: aplicativo do WooCommerce (EBAC Shop). Coloque o APK em app/loja-ebac.apk.
export const config = {
  runner: 'local',
  specs: ['./test/specs/**/*.js'],
  maxInstances: 1,
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android',
    'appium:app': new URL('./app/loja-ebac.apk', import.meta.url).pathname,
    // Espera a tela de login do app do WooCommerce abrir antes de iniciar o teste
    'appium:appWaitActivity': 'com.woocommerce.android.ui.login.LoginActivity',
    'appium:newCommandTimeout': 240,
    'appium:autoGrantPermissions': true
  }],
  services: ['appium'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { ui: 'bdd', timeout: 300000 }
}
