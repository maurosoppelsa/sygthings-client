import I18n from 'react-native-i18n';
const  en = require('./locales/en.json');
const  es = require('./locales/es.json');

I18n.fallbacks = true;

I18n.defaultLocale = 'es';
 
I18n.translations = {
  en,
  es,
};
 
export default I18n;