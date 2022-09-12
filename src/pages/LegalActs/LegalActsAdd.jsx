import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'

import TM_FLAG from '../../assets/images/locales/tm.jpg'
import RU_FLAG from '../../assets/images/locales/ru.jpg'
import EN_FLAG from '../../assets/images/locales/en.jpg'

import { setLoading } from '../../redux/reducers/mainReducer'
import AppLayout from '../../layouts/AppLayout'
import { NavLink, Redirect, useHistory } from 'react-router-dom'

import api from '../../services/api.service'
import toast from 'react-hot-toast'

const LegalActsAdd = () => {
    const dispatch = useDispatch()
    const { t ,i18n} = useTranslation()
    const history = useHistory()

    const [title, setTitle] = useState(null)
    const [text, setText] = useState(null)
    const [regist_date,set_regist_date] = useState(null)
    const [regist_id,set_regist_id] = useState('')
    const [last_update,set_last_update] = useState('')




    //////////////////

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title_tm', title.tm)
        formData.append('title_ru', title.ru || " ")
        formData.append('title_en', title.en || " ")
        formData.append('description_tm', text.tm)
        formData.append('description_ru', text.ru || '')
        formData.append('description_en', text.en || '')
        formData.append('registration_date', regist_date)
        formData.append('registration_id', regist_id)
        formData.append('last_updated', last_update)

        try {
            const response = await api.post('/regulatory_legal_acts', formData)
            if (response.status === 200) {
                toast.success(t('success_added'), {
                    duration: 2000,
                })
                history.push('/legalActs')
            }
        }
        catch (e) {
            toast.error(t('error_not_added'), {
                duration: 2000,
            })
        }
        // console.log(data)
    }



    return (
        <AppLayout>
            <form onSubmit={e => onSubmit(e)} className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl">
                <h1 className="text-2xl font-montserrat-bold"> Döwlet belligine alnan kadalaşdyryjy hukuk namany goşmak </h1>
                <p className="text-red-400 my-3"> ÜNS beriň gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly. </p>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold" htmlFor="title_tm">
                        <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                        Namanyň ady
                        <p className="text-red-500 text-lg mx-2">*</p>
                    </label>
                    <input
                        id="title_tm"
                        type="text"
                        required
                        onChange={e => setTitle({ ...title, tm: e.target.value })}
                        placeholder="Hukuk edebiýat sözbaşyny giriziň"
                        className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                    />
                </aside>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold" htmlFor="title_ru">
                        <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                        Namanyň ady

                    </label>
                    <input
                        id="title_ru"
                        type="text"
                        onChange={e => setTitle({ ...title, ru: e.target.value })}
                        placeholder="Hukuk edebiýat sözbaşyny giriziň"
                        className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                    />
                </aside>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold" htmlFor="title_en">
                        <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                        Namanyň ady
                    </label>
                    <input
                        id="title_en"
                        type="text"
                        onChange={e => setTitle({ ...title, en: e.target.value })}
                        placeholder="Hukuk edebiýat sözbaşyny giriziň"
                        className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                    />
                </aside>



                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold mb-2" htmlFor="text_tm">
                        <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                       Namanyň ýazgysy
                        <p className="text-red-500 text-lg mx-2">*</p>
                    </label>

                    <CKEditor
                        editor={DecoupledEditor}
                        onReady={editor => {
                            editor.ui.getEditableElement().parentElement.insertBefore(
                                editor.ui.view.toolbar.element,
                                editor.ui.getEditableElement()
                            );
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setText({ ...text, tm: data })
                        }}
                    />
                </aside>


                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold mb-2" htmlFor="text_ru">
                        <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                        Namanyň ýazgysy

                    </label>

                    <CKEditor
                        editor={DecoupledEditor}
                        onReady={editor => {
                            editor.ui.getEditableElement().parentElement.insertBefore(
                                editor.ui.view.toolbar.element,
                                editor.ui.getEditableElement()
                            );
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setText({ ...text, ru: data })
                        }}
                    />
                </aside>


                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold mb-2" htmlFor="text_en">
                        <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                        Namanyň ýazgysy
                        

                    </label>

                    <CKEditor
                        editor={DecoupledEditor}
                        onReady={editor => {
                            editor.ui.getEditableElement().parentElement.insertBefore(
                                editor.ui.view.toolbar.element,
                                editor.ui.getEditableElement()
                            );
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setText({ ...text, en: data })
                        }}
                    />
                </aside>


      

                <aside className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-6 flex flex-col">
                        <label className="flex items-center font-bold" htmlFor="registered_date">
                            Kabul edilen senesi
                            <p className="text-red-500 text-lg mx-2">*</p>
                        </label>
                        <input
                            id="registered_date"
                            type="date"
                            required
                            onChange={e => set_regist_date(e.target.value)}
                            placeholder="Kabul edilen senesi"
                            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                        />
                    </div>
                </aside>
                <aside className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-6 flex flex-col">
                        <label className="flex items-center font-bold" htmlFor="last_update">
                            Soňky üýtgeme
                        </label>
                        <input
                            id="last_update"
                            type="text"
                            onChange={e => set_last_update(e.target.value)}
                            placeholder="Soňky üýtgeme"
                            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                        />
                    </div>
                </aside>
                <aside className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-6 flex flex-col">
                        <label className="flex items-center font-bold" htmlFor="act_id">
                            Nama belgi
                            <p className="text-red-500 text-lg mx-2">*</p>
                        </label>
                        <input
                            id="act_id"
                            type="number"
                            required
                            onChange={e => set_regist_id(e.target.value)}
                            placeholder="Nama belgi"
                            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                        />
                    </div>
                </aside>

                <aside className="flex items-center justify-center mt-7">
                    <NavLink
                        to={`/legalActs`}
                        className="bg-gray-50 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2 mx-2"
                    >
                        {t('cancel')}
                    </NavLink>
                    {
                        (title?.tm&&text?.tm&&regist_date&&regist_id)?
                    
                    <button
                        type="submit"
                        className="bg-white text-green-700 border border-green-700 hover:bg-green-700 hover:text-white duration-300 font-bold rounded-lg px-5 py-2 mx-2"
                    >
                        {t('save')}
                    </button>:
                    <button
                    type="button"
                    disabled
                    className="bg-gray-50  text-gray-500  font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2 mx-2"
                >
                    {t('save')}
                </button>
                    }
                </aside>


            </form>
        </AppLayout>
    )
}

export default LegalActsAdd
