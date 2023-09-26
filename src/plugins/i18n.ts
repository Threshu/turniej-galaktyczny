import { createI18n } from 'vue-i18n'
import en from '../locales/en.json';
import pl from '../locales/pl.json';

const i18n = createI18n({
  locale: 'pl',
  fallbackLocale: 'en',
  messages: {
    en,
    pl,
  },
})

export default i18n;
