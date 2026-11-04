import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Configuração do WebdriverIO para Android (emulador/dispositivo local com Appium).
// App: aplicativo do WooCommerce (EBAC Shop). Coloque o APK em app/loja-ebac.apk.
// Conecta no Appium já em execução (rode `appium` em um terminal à parte, porta 4723).
// noReset=true mantém a sessão já logada no app (ver README).
export const config = {
  runner: 'local',

  // Conexão com o Appium Server que já está rodando
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',

  specs: ['./test/specs/**/*.js'],
  maxInstances: 1,
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android',
    'appium:app': join(__dirname, 'app', 'loja-ebac.apk'),
    'appium:appWaitActivity': '*',
    'appium:noReset': true,
    'appium:newCommandTimeout': 240,
    'appium:autoGrantPermissions': true
  }],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { ui: 'bdd', timeout: 300000 }
}
