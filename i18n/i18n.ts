import i18next from 'i18next';
import { defaultLanguage } from '../app/config/language';
const en = require('./locales/en.json');
const es = require('./locales/es.json');

class I18n {
  static instance: I18n;

  constructor() {
    if (I18n.instance) {
      return I18n.instance;
    }

    i18next.init({
      lng: defaultLanguage,
      fallbackLng: defaultLanguage,
      compatibilityJSON: 'v3',
      resources: {
        en: {
          translation: en,
        },
        es: {
          translation: es,
        },
      },
    });

    I18n.instance = this;
  }

  t(key: string) {
    return i18next.t(key);
  }
}

const i18nInstance = new I18n();

export default i18nInstance;
