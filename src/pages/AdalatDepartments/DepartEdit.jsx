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
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom'

import api from '../../services/api.service'
import toast from 'react-hot-toast'
import { returnRfcDateFormat } from '../../helpers/returnRfcDateFormat'

const LegalActsEdit = () => {
    const dispatch = useDispatch()
    const { t ,i18n} = useTranslation()
    const history = useHistory()
    const {id} = useParams()
    const [title, setTitle] = useState({
        tm: '', en: '', ru: ''
      })
      const [text, setText] = useState({
        tm: '<div></div>', en: '<div></div>', ru: '<div></div>'
      })
    // const [regist_date,set_regist_date] = useState(null)
    // const [regist_id,set_regist_id] = useState('')
    // const [last_update,set_last_update] = useState('')
    const [data,setData] = useState(null)

// console.log(regist_date)

    //////////////////

    const onSubmit = async (e) => {
        e.preventDefault()
        // const formData = new FormData()
        // formData.append('title_tm', title.tm)
        // formData.append('title_ru', title.ru || " ")
        // formData.append('title_en', title.en || " ")
        // formData.append('description_tm', text.tm)
        // formData.append('description_ru', text.ru || '')
        // formData.append('description_en', text.en || '')
        // formData.append('registration_date', regist_date)
        // formData.append('registration_id', regist_id)
        // formData.append('last_updated', last_update)
        // formData.append('_method','PUT')
        const formValue = {
            title:{
                "tm":title.tm,
                "ru":title.ru || " ",
                "en":title.en || " ",
            },
            description:{
                "tm":text.tm,
                "ru":text.ru || '',
                "en":text.en || '',
            }
        }
        dispatch(setLoading(true))
        try {
            const response = await api.put(`/justice_organizations/${id}`, formValue)
            dispatch(setLoading(false))
            if (response.status === 200) {
                toast.success(t('success_added'), {
                    duration: 2000,
                })
                history.push('/adalat-edaralary')
            }
        }
        catch (e) {
            toast.error(t('error_not_added'), {
                duration: 2000,
            })
        }
        dispatch(setLoading(false))


    }

    const fetchData = async(id)=>{
        dispatch(setLoading(true))
        try{
            const res = await api.get(`/justice_organizations/${id}`)
            if(res.status === 200){
                const department = res.data.data
                // console.log(department)

                // set_regist_date(returnRfcDateFormat(department.registration_date))
                // set_regist_id(department.registration_id)
                // set_last_update(department.last_updated )
                setTitle({
                    tm:department?.title[`tm`],
                    ru:department?.title[`ru`],
                    en:department?.title[`en`]
                  })
                  setText({
                    tm:department?.description[`tm`],
                    ru:department?.description[`ru`],
                    en:department?.description[`en`]
                  })
                setData(res.data.data)
            }
        }
        catch(e){

        }
        dispatch(setLoading(false))
    }

    useEffect(()=>{
        fetchData(id)
    },[])
    // console.log(regist_date)
    // console.log(title)
    // console.log(text)
    return (
        <AppLayout>
            <form onSubmit={e => onSubmit(e)} className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl">
                <h1 className="text-2xl font-montserrat-bold"> Adalat edaralaryny go??mak </h1>
                <p className="text-red-400 my-3"> ??NS beri?? gyzyl ??yldyzjyk bilen belenen ????j??kleri h??kman doldurmaly. </p>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold" htmlFor="title_tm">
                        <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                        Edarany?? ady
                        <p className="text-red-500 text-lg mx-2">*</p>
                    </label>
                    <input
                        id="title_tm"
                        type="text"
                        required
                        value={title.tm}
                        onChange={e => setTitle({ ...title, tm: e.target.value })}
                        placeholder="Hukuk edebi??at s??zba??yny girizi??"
                        className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                    />
                </aside>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold" htmlFor="title_ru">
                        <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                        Edarany?? ady

                    </label>
                    <input
                        id="title_ru"
                        type="text"
                        value={title.ru}
                        onChange={e => setTitle({ ...title, ru: e.target.value })}
                        placeholder="Hukuk edebi??at s??zba??yny girizi??"
                        className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                    />
                </aside>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold" htmlFor="title_en">
                        <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                        Edarany?? ady
                    </label>
                    <input
                        id="title_en"
                        type="text"
                        value={title.en}
                        onChange={e => setTitle({ ...title, en: e.target.value })}
                        placeholder="Hukuk edebi??at s??zba??yny girizi??"
                        className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                    />
                </aside>



                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold mb-2" htmlFor="text_tm">
                        <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                       Edarany?? ??azgysy
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
                        data={(data && data.description[`tm`])||'<p> </p>'}
                    />
                </aside>


                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold mb-2" htmlFor="text_ru">
                        <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                        Edarany?? ??azgysy

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
                        data={(data && data.description[`ru`])||'<p> </p>'}
                    />
                </aside>


                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold mb-2" htmlFor="text_en">
                        <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                        Edarany?? ??azgysy

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
                        data={(data && data.description[`en`])||'<p> </p>'}
                    />
                </aside>


      

                {/* <aside className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-6 flex flex-col">
                        <label className="flex items-center font-bold" htmlFor="registered_date">
                            Kabul edilen senesi
                            <p className="text-red-500 text-lg mx-2">*</p>
                        </label>
                        <input
                            
                            id="registered_date"
                            type="date"
                            required

                            value={regist_date}
                            onChange={e => set_regist_date(e.target.value)}
                            placeholder="Kabul edilen senesi"
                            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                        />
                    </div>
                </aside>
                <aside className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-6 flex flex-col">
                        <label className="flex items-center font-bold" htmlFor="last_update">
                            So??ky ????tgeme
                        </label>
                        <input
                            id="last_update"
                            type="text"
                            value={last_update}
                            onChange={e => set_last_update(e.target.value)}
                            placeholder="So??ky ????tgeme"
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
                            value={regist_id}
                            onChange={e => set_regist_id(e.target.value)}
                            placeholder="Nama belgi"
                            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                        />
                    </div>
                </aside> */}

                <aside className="flex items-center justify-center mt-7">
                    <NavLink
                        to={`/adalat-edaralary`}
                        className="bg-gray-50 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2 mx-2"
                    >
                        {t('cancel')}
                    </NavLink>
                    {
                        (title?.tm&&text?.tm)?
                    
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

export default LegalActsEdit
