import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ru from './locales/ru.json'
import en from './locales/en.json'

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en }
  },
  lng: 'ru',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // ОБЯЗАТЕЛЬНО для React 16
  },
  react: {
    useSuspense: false // ВАЖНО для старого React
  }
})

export default i18n

