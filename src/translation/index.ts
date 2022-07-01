import { createI18n } from 'vue-i18n'

const i18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: require('@/i18n/en.json'),
    es: require('@/i18n/es.json'),
    it: require('@/i18n/it.json'),
  }
}

export const i18n = createI18n(i18nConfig);
