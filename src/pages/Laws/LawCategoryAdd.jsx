import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import TM_FLAG from '../../assets/images/locales/tm.jpg'
import RU_FLAG from '../../assets/images/locales/ru.jpg'
import EN_FLAG from '../../assets/images/locales/en.jpg'

import { postLawCategory } from '../../redux/actions/lawsAction'
import { setLoading } from '../../redux/reducers/mainReducer'

const LawCategoryAdd = ({close}) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [title, setTitle] = useState(null)

    const onSubmit = e => {
        e.preventDefault()

        dispatch(postLawCategory(title))
        close()
        dispatch(setLoading(true))
    }


    return (
        <form onSubmit={e => onSubmit(e)} className="font-montserrat-medium p-5 lg:p-8">
            <h1 className="text-2xl font-montserrat-bold"> Hukuk bölümi goşmak </h1>
            <p className="text-red-400 my-3"> ÜNS beriň gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly. </p>

            <aside className="flex flex-col my-4">
                <label className="flex items-center font-bold" htmlFor="title_tm">
                    <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                    Hukuk bölüm ady
                    <p className="text-red-500 text-lg mx-2">*</p>
                </label>
                <input
                    id="title_tm"
                    type="text"
                    required
                    onChange={e => setTitle({...title, tm: e.target.value})}
                    placeholder="Täzelik sözbaşyny giriziň"
                    className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                />
            </aside>

            <aside className="flex flex-col my-4">
                <label className="flex items-center font-bold" htmlFor="title_ru">
                    <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                    Hukuk bölüm ady
                </label>
                <input
                    id="title_ru"
                    type="text"
                    onChange={e => setTitle({...title, ru: e.target.value})}
                    placeholder="Täzelik sözbaşyny giriziň"
                    className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                />
            </aside>

            <aside className="flex flex-col my-4">
                <label className="flex items-center font-bold" htmlFor="title_en">
                    <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                    Hukuk bölüm ady
                </label>
                <input
                    id="title_en"
                    type="text"
                    onChange={e => setTitle({...title, en: e.target.value})}
                    placeholder="Täzelik sözbaşyny giriziň"
                    className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                />
            </aside>


            <aside className="flex items-center justify-center my-10">
                <button
                    type="button"
                    onClick={() => close()}
                    className="bg-gray-50 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2 mx-2"
                >
                    { t('cancel') }
                </button>

                <button
                    type="submit"
                    className="bg-white text-green-700 border border-green-700 hover:bg-green-700 hover:text-white duration-300 font-bold rounded-lg px-5 py-2 mx-2"
                >
                    { t('save') }
                </button>
            </aside>
        </form>
    )
}

export default LawCategoryAdd
