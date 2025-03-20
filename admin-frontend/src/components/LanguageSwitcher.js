import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'ar', name: 'العربية' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'el', name: 'Ελληνικά' },
    { code: 'es', name: 'Español' },
    { code: 'fi', name: 'Suomalainen' },
    { code: 'fil', name: 'Filipino' },
    { code: 'fr', name: 'Français' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'hu', name: 'Magyar' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'it', name: 'Italiano' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'ms', name: 'Bahasa Melayu' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'no', name: 'Norsk' },
    { code: 'pl', name: 'Polski' },
    { code: 'pt', name: 'Português' },
    { code: 'ro', name: 'Română' },
    { code: 'ru', name: 'Русский' },
    { code: 'sv', name: 'Svenska' },
    { code: 'th', name: 'ไทย' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'uk', name: 'Українська' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'zh', name: '中文' },
    { code: 'he', name: 'עברית' },
    { code: 'cs', name: 'Čeština' }
  ];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="language-switch">
      {languages.map((lang) => (
        <button key={lang.code} onClick={() => changeLanguage(lang.code)}>
          {lang.name}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher; 