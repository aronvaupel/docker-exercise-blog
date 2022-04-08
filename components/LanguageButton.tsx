import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageButton = () => {
  const [lang, setLang] = useState('de')
  const [buttonText, setButtonText] = useState<string>('Deutsch')

  const { i18n } = useTranslation()

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang)
  }
  return (
    <div className="w-24 h-6 mb-16">
      <button
        className="p-4 text-base text-slate-50 bg-slate-900 border border-red-500 rounded block"
        onClick={(event) => {
          lang === 'en' ? setLang('de') : setLang('en')
          changeLang(lang)
          buttonText === 'English'
            ? setButtonText('Deutsch')
            : setButtonText('English')
        }}
      >
        {buttonText}
      </button>
    </div>
  )
}
export default LanguageButton
