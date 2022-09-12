import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import TM_FLAG from '../../assets/images/locales/tm.jpg'
import RU_FLAG from '../../assets/images/locales/ru.jpg'
import EN_FLAG from '../../assets/images/locales/en.jpg'
import changeLocale from "../../helpers/changeLocale";

const Locale = () => {
  const [select, setSelect] = useState(false);
  const locale = localStorage.getItem('locale')
  const locales = {
    tm: TM_FLAG,
    ru: RU_FLAG,
    en: EN_FLAG
  }

  const localeChange = locale => {
    changeLocale(locale)
    setSelect(!select)
  }

  return (
    <aside className="flex items-center">
      <div className="w-8" onClick={() => setSelect(!select)}>
        <img className="w-8" src={locales[locale]} alt="Locale" />
      </div>
      <AnimatePresence>
        {select && (
          <motion.div
            initial={{ y: '-5vh', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-5vh', opacity: 0 }}
            transition={{ type: 'tween', duration: .4 }}
            className="bg-white font-montserrat-medium overflow-hidden rounded-xl border fixed mt-3 top-16 right-5 w-48"
          >
            <div
              onClick={() => localeChange('tm')}
              className="flex items-center border-b border-gray-200 hover:bg-green-500 hover:text-white duration-500 cursor-pointer px-4 py-2"
            >
              <img className="w-12 p-1 mx-1" src={TM_FLAG} alt="Turkmen" />
              <p> Türkmençe </p>
            </div>

            <div
              onClick={() => localeChange('ru')}
              className="flex items-center border-b border-gray-200 hover:bg-green-500 hover:text-white duration-500 cursor-pointer px-4 py-2"
            >
              <img className="w-12 p-1 mx-1" src={RU_FLAG} alt="Russian" />
              <p> Русский </p>
            </div>

            <div
              onClick={() => localeChange('en')}
              className="flex items-center border-b border-gray-200 hover:bg-green-500 hover:text-white duration-500 cursor-pointer px-4 py-2"
            >
              <img className="w-12 p-1 mx-1" src={EN_FLAG} alt="English" />
              <p> English </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  )
}

export default Locale;