import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import TM from './tm/translation'
import RU from './ru/translation'
import EN from './en/translation'

const resources = {
    tm: {
        translation: TM
    },
    ru: {
        translation: RU
    },
    en: {
        translation: EN
    },
}

let defaultLocale = localStorage.getItem('locale')

if(defaultLocale === null)
{
    localStorage.setItem('locale', 'tm')
    defaultLocale = localStorage.getItem('locale')
}

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        lng: defaultLocale,
        interpolation: {
            escapeValue: false
        }
    })

export default i18n