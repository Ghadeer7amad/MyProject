import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from "./locale/en.json"
import translationAR from "./locale/ar.json"
import  LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar',
    //fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react:{
        useSuspence: false
    }
  });

export default i18n;


