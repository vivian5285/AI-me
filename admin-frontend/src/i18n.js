import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to AI Finance",
          connectWallet: "Connect Wallet",
          connectedAccount: "Connected Account: {{account}}"
        }
      },
      zh: {
        translation: {
          welcome: "欢迎来到 AI Finance",
          connectWallet: "连接钱包",
          connectedAccount: "已连接账户: {{account}}"
        }
      },
      fr: {
        translation: {
          welcome: "Bienvenue à AI Finance",
          connectWallet: "Connecter le portefeuille",
          connectedAccount: "Compte connecté: {{account}}"
        }
      },
      es: {
        translation: {
          welcome: "Bienvenido a AI Finance",
          connectWallet: "Conectar billetera",
          connectedAccount: "Cuenta conectada: {{account}}"
        }
      }
      // 添加更多语言
    },
    lng: "en", // 默认语言
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 