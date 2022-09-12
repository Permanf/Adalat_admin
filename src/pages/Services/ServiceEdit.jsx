import { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addService } from '../../redux/actions/serviceAction'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'

import api from '../../services/api.service'
import AppLayout from "../../layouts/AppLayout"
import Alert from '../../components/Alert/Alert'
import Loader from '../../components/Loader/Loader'
import { useTranslation } from 'react-i18next'

import TM_FLAG from '../../assets/images/locales/tm.jpg'
import RU_FLAG from '../../assets/images/locales/ru.jpg'
import EN_FLAG from '../../assets/images/locales/en.jpg'

const ServiceEdit = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { id } = useParams()
    const [inputData, setInputData] = useState({
        select_image: 'Surat saýlaň',
        image: '',
        image_preview: '',
    })
    const [service, setService] = useState(null)
    const [title, setTitle] = useState(null)
    const [text, setText] = useState(null)
    const [success, setSuccess] = useState(false)
    const [sendData, setSendData] = useState(false)

    useEffect(() => {
        api.get(`service/${id}`).then(res => {
            setService(res.data.data)
            setTitle(res.data.data.title)
            setText(res.data.data.text)
        })
    }, [])

    const onSubmit = e => {
        e.preventDefault()
        setSendData(true)

        api.put(`service/${id}`, { title: JSON.stringify(title), text: JSON.stringify(text) }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status === 200)
            {
                setTimeout(() => setSuccess(true), 4000)
                setTimeout(() => setSuccess(false), 8000)
            }
            dispatch(addService(res.data.services))
        })
          .catch(err => console.log(err))
    }

    return (
        <>
            {
                sendData && <Loader time={3000}/>
            }
            {
                success && <Alert success show={true} message="Täze maglumatlar ýatda saklanyldy."/>
            }
            <AppLayout>
                
                {
                    service &&
                    <form onSubmit={event => onSubmit(event)} className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl">
                        <h1 className="text-2xl font-montserrat-bold"> Hyzmaty üýtgetmek </h1>
                        <p className="text-red-400 my-5"> ÜNS beriň gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly. </p>


                        <aside className="flex flex-col my-4">
                            <label className="font-bold" htmlFor="logo"> Suraty </label>

                            <img className="w-96 my-2 rounded-xl" src={ inputData.image_preview ? inputData.image_preview : service.image} alt={service.title.tm} />

                            <div className="relative border border-gray-200 bg-gray-50 rounded-md my-2 px-4 py-2 h-12">
                                <label className="absolute top-3 left-4 text-gray-400" htmlFor="file">
                                    { inputData.select_image }
                                </label>
                                <input
                                    onChange={e => setInputData({...inputData, image_preview: URL.createObjectURL(e.target.files[0]), select_image: e.target.files[0].name, image: e.target.files[0]})}
                                    type="file"
                                    className="opacity-0 absolute top-0 left-0 right-0 bottom-0 w-full"
                                />
                            </div>
                        </aside>


                        <aside className="flex flex-col my-4">
                            <label className="flex items-center font-bold" htmlFor="title_tm">
                                <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                                Hyzmatyň sözbaşy
                                <p className="text-red-500 text-lg mx-2">*</p>
                            </label>
                            <input
                                id="title_tm"
                                type="text"
                                onChange={e => setTitle({...title, tm: e.target.value})}
                                placeholder="Hyzmatyň sözbaşyny giriziň"
                                value={title && title.tm}
                                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                            />
                        </aside>


                        <aside className="flex flex-col my-4">
                            <label className="flex items-center font-bold" htmlFor="title_ru">
                                <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                                Hyzmatyň sözbaşy
                            </label>
                            <input
                                id="title_ru"
                                type="text"
                                onChange={e => setTitle({...title, ru: e.target.value})}
                                placeholder="Hyzmatyň sözbaşyny giriziň"
                                value={title && title.ru}
                                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                            />
                        </aside>


                        <aside className="flex flex-col my-4">
                            <label className="flex items-center font-bold" htmlFor="title_en">
                                <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                                Hyzmatyň sözbaşy
                            </label>
                            <input
                                id="title_en"
                                type="text"
                                onChange={e => setTitle({...title, en: e.target.value})}
                                placeholder="Hyzmatyň sözbaşyny giriziň"
                                value={title && title.en}
                                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                            />
                        </aside>


                        {
                            text &&
                            <aside className="flex flex-col my-4">
                                <label className="flex items-center font-bold" htmlFor="text_tm">
                                    <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                                    Hyzmatyň ýazgysy
                                    <p className="text-red-500 text-lg mx-2">*</p>
                                </label>
                                
                                <CKEditor
                                    editor={ DecoupledEditor }
                                    onReady={ editor => {
                                        editor.ui.getEditableElement().parentElement.insertBefore(
                                        editor.ui.view.toolbar.element,
                                        editor.ui.getEditableElement()
                                        );
                                    } }
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setText({...text, tm: data})
                                    }}
                                    data={text.tm}
                                />
                            </aside>
                        }


                        {
                            text &&
                            <aside className="flex flex-col my-4">
                                <label className="flex items-center font-bold" htmlFor="text_ru">
                                    <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                                    Hyzmatyň ýazgysy
                                </label>
                                
                                <CKEditor
                                    editor={ DecoupledEditor }
                                    onReady={ editor => {
                                        editor.ui.getEditableElement().parentElement.insertBefore(
                                        editor.ui.view.toolbar.element,
                                        editor.ui.getEditableElement()
                                        );
                                    } }
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setText({...text, ru: data})
                                    }}
                                    data={text.ru}
                                />
                            </aside>
                        }


                        
                        {
                            text &&
                            <aside className="flex flex-col my-4">
                                <label className="flex items-center font-bold" htmlFor="text_en">
                                    <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                                    Hyzmatyň ýazgysy
                                </label>
                                
                                <CKEditor
                                    editor={ DecoupledEditor }
                                    onReady={ editor => {
                                        editor.ui.getEditableElement().parentElement.insertBefore(
                                        editor.ui.view.toolbar.element,
                                        editor.ui.getEditableElement()
                                        );
                                    } }
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setText({...text, en: data})
                                    }}
                                    data={text.en}
                                />
                            </aside>
                        }



                        <aside className="flex items-center justify-center my-10">
                            <NavLink
                                to={`/service/${id}`}
                                className="bg-gray-50 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2 mx-2"
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
                }
            </AppLayout>
        </>
    )
}

export default ServiceEdit
