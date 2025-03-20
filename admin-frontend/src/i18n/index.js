import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: "Home",
      dashboard: "Dashboard",
      // 更多翻译
    },
  },
  zh: {
    translation: {
      home: "主页",
      dashboard: "个人账户",
      // 更多翻译
    },
  },
  // 添加更多语言
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'zh', // 默认语言
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
