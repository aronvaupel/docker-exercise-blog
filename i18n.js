import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './copy/en'
import de from './copy/de'

const resources = {
  en: en,
  de: de,
}
const detector = new LanguageDetector()
detector.init({
  order: ['path'],
  lookupFromPathIndex: 0,
})

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      bindI18n: 'loaded languageChanged',
      bindI18nStore: 'added',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true,
    },
    detection: {
      order: ['path'],
      lookupFromPathIndex: 0,
    },
  })

export default i18n
