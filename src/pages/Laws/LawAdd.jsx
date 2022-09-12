import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'

import TM_FLAG from '../../assets/images/locales/tm.jpg'
import RU_FLAG from '../../assets/images/locales/ru.jpg'
import EN_FLAG from '../../assets/images/locales/en.jpg'

import { setLoading, setRedirect } from '../../redux/reducers/mainReducer'
import AppLayout from '../../layouts/AppLayout'
import { NavLink, Redirect, useParams } from 'react-router-dom'
import { loadLawConfirmDepartments, loadLaws, postLaw } from '../../redux/actions/lawsAction'
import getByLocale from '../../helpers/getByLocale'
import { loadYears } from '../../redux/actions/yearAction'

const LawAdd = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { id } = useParams()
    const [title, setTitle] = useState(null)
    const [text, setText] = useState(null)
    const [lastUpdated, setLastUpdated] = useState(null)
    const [confirmedDate, setConfirmedDate] = useState(null)
    const [yearId, setYearId] = useState(1)
    const [lawId, setLawId] = useState(1)
    const [lawConfirmDepartmentId, setLawConfirmDepartmentId] = useState(1)
    const lawConfirmDepartments = useSelector(state => state.laws.law_confirm_departments)
    const laws = useSelector(state => state.laws.laws)
    const redirect = useSelector(state => state.main.redirect)
    const years = useSelector(state => state.year.years)
    console.log(years)
    const onSubmit = e => {
        e.preventDefault()

        const payload = {
            id,
            title,
            text,
            year_id: yearId,
            law_id: lawId,
            confirmed_date: confirmedDate,
            last_updated: lastUpdated,
            law_confirm_department_id: lawConfirmDepartmentId,
        }

        dispatch(postLaw(payload))
        dispatch(setLoading(true))
        dispatch(setRedirect(true))
    }

    useEffect(() => {
        dispatch(loadLaws())
        dispatch(loadLawConfirmDepartments())
        dispatch(loadYears())
    }, [])

    return (
        <AppLayout>
            {
                redirect && <Redirect to={`/law/${id}`} />
            }
            <form onSubmit={e => onSubmit(e)} className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl">
                <h1 className="text-2xl font-montserrat-bold"> Hukuk goşmak </h1>
                <p className="text-red-400 my-3"> ÜNS beriň gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly. </p>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold" htmlFor="title_tm">
                        <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                        Hukuk ady
                        <p className="text-red-500 text-lg mx-2">*</p>
                    </label>
                    <input
                        id="title_tm"
                        type="text"
                        required
                        onChange={e => setTitle({...title, tm: e.target.value})}
                        placeholder="Täzelik sözbaşyny giriziň"
                        className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                    />
                </aside>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold" htmlFor="title_ru">
                        <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                        Hukuk ady
                    </label>
                    <input
                        id="title_ru"
                        type="text"
                        onChange={e => setTitle({...title, ru: e.target.value})}
                        placeholder="Täzelik sözbaşyny giriziň"
                        className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                    />
                </aside>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold" htmlFor="title_en">
                        <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                        Hukuk ady
                    </label>
                    <input
                        id="title_en"
                        type="text"
                        onChange={e => setTitle({...title, en: e.target.value})}
                        placeholder="Täzelik sözbaşyny giriziň"
                        className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                    />
                </aside>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold mb-2" htmlFor="text_tm">
                        <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                        Hukuk ýazgysy
                        <p className="text-red-500 text-lg mx-2">*</p>
                    </label>
                    
                    <CKEditor
                        editor={ DecoupledEditor }
                        config={ {
                            toolbar: [
                                "heading",
                                "|",
                                "bold",
                                "italic",
                                "link",
                                "bulletedList",
                                "numberedList",
                                "blockQuote",
                                "ckfinder",
                                "|",
                                "imageTextAlternative",
                                "imageUpload",
                                "imageStyle:full",
                                "imageStyle:side",
                                "|",
                                "mediaEmbed",
                                "insertTable",
                                "tableColumn",
                                "tableRow",
                                "mergeTableCells",
                                "|",
                                "undo",
                                "redo"
                              ]
                        } }
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
                    />
                </aside>


                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold mb-2" htmlFor="text_ru">
                        <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                        Hukuk ýazgysy
                    </label>
                    
                    <CKEditor
                        editor={ DecoupledEditor }
                        config={ {
                            toolbar: [
                                "heading",
                                "|",
                                "bold",
                                "italic",
                                "link",
                                "bulletedList",
                                "numberedList",
                                "blockQuote",
                                "ckfinder",
                                "|",
                                "imageTextAlternative",
                                "imageUpload",
                                "imageStyle:full",
                                "imageStyle:side",
                                "|",
                                "mediaEmbed",
                                "insertTable",
                                "tableColumn",
                                "tableRow",
                                "mergeTableCells",
                                "|",
                                "undo",
                                "redo"
                              ]
                        } }
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
                    />
                </aside>


                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold mb-2" htmlFor="text_en">
                        <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                        Hukuk ýazgysy
                    </label>
                    
                    <CKEditor
                        editor={ DecoupledEditor }
                        config={ {
                            toolbar: [
                                "heading",
                                "|",
                                "bold",
                                "italic",
                                "link",
                                "bulletedList",
                                "numberedList",
                                "blockQuote",
                                "ckfinder",
                                "|",
                                "imageTextAlternative",
                                "imageUpload",
                                "imageStyle:full",
                                "imageStyle:side",
                                "|",
                                "mediaEmbed",
                                "insertTable",
                                "tableColumn",
                                "tableRow",
                                "mergeTableCells",
                                "|",
                                "undo",
                                "redo"
                              ]
                        } }
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
                    />
                </aside>

                

                <aside className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-6 flex flex-col">
                        <label className="flex items-center font-bold" htmlFor="last_updated">
                            Soňky üýtgetme
                        </label>
                        <input
                            id="last_updated"
                            type="text"
                            required
                            onChange={e => setLastUpdated(e.target.value)}
                            placeholder="Soňky üýtgetme"
                            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                        />
                    </div>

                    
                    <div className="col-span-12 lg:col-span-6 flex flex-col">
                        <label className="flex items-center font-bold" htmlFor="confirmed_date">
                            Kabul edilen senesi
                        </label>
                        <input
                            id="confirmed_date"
                            type="text"
                            required
                            onChange={e => setConfirmedDate(e.target.value)}
                            placeholder="Kabul edilen senesi"
                            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                        />
                    </div>
                </aside>


                
                <aside className="grid grid-cols-12 gap-5 my-5">
                    {
                        lawConfirmDepartments && lawConfirmDepartments.length > 0 &&
                        <div className="col-span-12 lg:col-span-6 flex flex-col">
                            <label className="flex items-center font-bold" htmlFor="department_id">
                                { t('confirm_department') }
                            </label>
                            <select
                                onChange={e => setLawConfirmDepartmentId(e.target.value)}
                                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 my-2 px-4 py-3"
                            >
                                {
                                    lawConfirmDepartments.map((lawConfirmDepartment, index) => {
                                        return (
                                            <option key={index} value={lawConfirmDepartment.id}> { lawConfirmDepartment.name } </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    }


                    {
                        years && years.length > 0 &&
                        <div className="col-span-12 lg:col-span-6 flex flex-col">
                            <label className="flex items-center font-bold" htmlFor="year_id">
                                { t('confirmation_year') }
                            </label>
                            <select
                                onChange={e => setYearId(e.target.value)}
                                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 my-2 px-4 py-3"
                            >
                                {
                                    years.map((year, index) => {
                                        return (
                                            <option key={index} value={year.id}> { year.year } </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    }
                </aside>

                <aside className="grid grid-cols-12 gap-5">
                    {
                        laws && laws.length > 0 &&
                        <div className="col-span-12 lg:col-span-6 flex flex-col">
                            <label className="flex items-center font-bold" htmlFor="department_id">
                                Namanyň görnüşi
                            </label>
                            <select
                                // onChange={e => setEditLaw({...editLaw, department_id: e.target.value})}
                                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 my-2 px-4 py-3"
                            >
                                {
                                    laws.map((law, index) => {
                                        return (
                                            law && law.id &&
                                            <option key={index} value={law.id}> { getByLocale(law.title) } </option>
                                        )
                                    })
                            }
                            </select>
                        </div>
                    }

                    <div className="col-span-12 lg:col-span-6 flex flex-col">
                        <label className="flex items-center font-bold" htmlFor="manual">
                            Gollanma
                        </label>
                        <select
                            // onChange={e => setEditLaw({...editLaw, manual: e.target.value})}
                            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 my-2 px-4 py-3"
                        >
                            <option value="0"> Ýok </option>
                            <option value="1"> Hawa </option>
                        </select>
                    </div>
                </aside>


                <aside className="flex items-center justify-center mt-7">
                    <NavLink
                        to={`/law/${id}`}
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
        </AppLayout>
    )
}

export default LawAdd
