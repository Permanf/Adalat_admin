import AppLayout from "../../layouts/AppLayout"
import { useState } from 'react'

import TM_FLAG from '../../assets/images/locales/tm.jpg'
import RU_FLAG from '../../assets/images/locales/ru.jpg'
import EN_FLAG from '../../assets/images/locales/en.jpg'

import { NavLink, Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postSite } from "../../redux/actions/siteAction"
import { setLoading } from "../../redux/reducers/mainReducer"
import { useTranslation } from "react-i18next"

const SiteAdd = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const redirect = useSelector(state => state.main.redirect)
    const [link, setLink] = useState(null)
    const [name, setName] = useState(null)
    const [inputData, setInputData] = useState({
        select_logo: 'Logo saýlaň',
        logo: '',
    })
    
    const onSubmit = e => {
        e.preventDefault()

        const data = {
            logo: inputData.logo,
            link,
            name,
        }

        dispatch(postSite(data))
        dispatch(setLoading(true))
    }

    return (
        <AppLayout>
            {
                redirect && <Redirect to="/sites" />
            }
            <main className="font-montserrat-medium">
                <h1 className="text-2xl font-montserrat-bold"> Täze saýt goşmak </h1>
                <p className="text-red-400 mt-3 mb-10"> ÜNS beriň gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly. </p>

                <form
                    onSubmit={e => onSubmit(e)}
                    className="grid grid-cols-12 gap-5 overflow-x-hidden"
                >
                    <aside className="col-span-12 flex flex-col">
                        <label className="flex items-center font-bold" htmlFor="logo">
                            Logosy
                        </label>
                        {
                            inputData.logo && <img className="w-32 h-32 object-cover rounded-xl border p-2 my-4" src={URL.createObjectURL(inputData.logo)}/>
                        }
                        <div className="relative border border-gray-200 bg-gray-50 rounded-md my-2 px-4 py-2">
                            <label className="absolute top-3 left-4 text-gray-400" htmlFor="logo">
                                { inputData.select_logo }
                            </label>
                            <input
                                id="logo"
                                onChange={e => setInputData({...inputData, select_logo: e.target.files[0].name, logo: e.target.files[0]})}
                                type="file"
                                className="opacity-0"
                            />
                        </div>
                    </aside>


                    <aside className="col-span-12 flex flex-col">
                        <label className="flex items-center font-bold" htmlFor="link">
                            Saýtyň salgysy
                            <p className="text-red-500 text-lg mx-2">*</p>
                        </label>
                        <input
                            id="link"
                            type="text"
                            required
                            onChange={e => setLink(e.target.value)}
                            value={link}
                            placeholder="mysal üçin: minjust.gov.tm"
                            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                        />
                    </aside>


                    <aside className="col-span-12 lg:col-span-4 flex flex-col my-4">
                        <label className="flex items-center font-bold" htmlFor="title_tm">
                            <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                            Saýtyň ady
                            <p className="text-red-500 text-lg mx-2">*</p>
                        </label>
                        <input
                            id="title_tm"
                            type="text"
                            required
                            onChange={e => setName({...name, tm: e.target.value})}
                            placeholder="Saýtyň adyny giriziň"
                            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                        />
                    </aside>

                    <aside className="col-span-12 lg:col-span-4 flex flex-col my-4">
                        <label className="flex items-center font-bold" htmlFor="title_ru">
                            <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                            Saýtyň ady
                        </label>
                        <input
                            id="title_ru"
                            type="text"
                            required
                            onChange={e => setName({...name, ru: e.target.value})}
                            placeholder="Saýtyň adyny giriziň"
                            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                        />
                    </aside>

                    <aside className="col-span-12 lg:col-span-4 flex flex-col my-4">
                        <label className="flex items-center font-bold" htmlFor="title_en">
                            <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                            Saýtyň ady
                        </label>
                        <input
                            id="title_en"
                            type="text"
                            required
                            onChange={e => setName({...name, en: e.target.value})}
                            placeholder="Saýtyň adyny giriziň"
                            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                        />
                    </aside>

                    <aside className="col-span-12 flex justify-center mb-10">
                        <NavLink
                            to="/sites"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2 mr-2"
                        >
                            { t('cancel') }
                        </NavLink>

                        <button
                            type="submit"
                            className="bg-white text-green-700 border border-green-700 hover:bg-green-700 hover:text-white duration-300 font-bold rounded-lg px-5 py-2 mx-2"
                        >
                            { t('save') }
                        </button>
                    </aside>
                </form>
            </main>
        </AppLayout>
    )
}

export default SiteAdd