import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";

import { setLoading } from "../../redux/reducers/mainReducer";
import AppLayout from "../../layouts/AppLayout";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { loadLawConfirmDepartments, } from "../../redux/actions/lawsAction";
import { loadYears } from "../../redux/actions/yearAction";
import LiteratureFileAddImage from "./LiteratureFileAddImage";
import toast from "react-hot-toast";
import api, { API_URL } from "../../services/api.service";
import blobToImage from "../../helpers/blobToImage";
import { returnRfcDateFormat } from "../../helpers/returnRfcDateFormat";


const LiteratureEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { t } = useTranslation();
  const { id } = useParams();
  const [editImage, setEditImage] = useState(false)
  const lawConfirmDepartments = useSelector(state => state.laws.law_confirm_departments)
  const years = useSelector(state => state.year.years)
  const [confirmedDate, setConfirmedDate] = useState(null)

  const [title, setTitle] = useState({
    tm: '', en: '', ru: ''
  })
  const [text, setText] = useState({
    tm: '<div></div>', en: '<div></div>', ru: '<div></div>'
  })
  const [yearId, setYearId] = useState(1)
  
  const [lawConfirmDepartmentId, setLawConfirmDepartmentId] = useState(1)
  //adding image
  const [newCropedImage, setNewCropedImage] = useState();
  const [img, setImg] = useState()
  const [data, setData] = useState([])


  const onSubmit = async (e) => {
    e.preventDefault()
    const image = await blobToImage(newCropedImage, 'image.png')
    const formData = new FormData()
    if(newCropedImage) formData.append('image', image)
    formData.append('title_tm', title.tm || title)
    formData.append('title_ru', title.ru || title)
    formData.append('title_en', title.en || title)
    formData.append('description_tm', text.tm || text)
    formData.append('description_ru', text.ru || text)
    formData.append('description_en', text.en || text)
    formData.append('year', yearId)
    formData.append('confirm_gov_id', lawConfirmDepartmentId)
    // formData.append('guide', 'Hawa')


    try {
        const response = await api.post(`law-literature/update/${id}`, formData)
        if (response.status === 200) {
          toast.success(t('success_added'), {
              duration: 2000,
          })
            history.push('/laws')
            

        }
    }
    catch (e) {
        toast.error(t('error_not_added'), {
            duration: 2000,
        })
    }


}



  const fetchData = async () => {
    dispatch(setLoading(true))
    try {
      const response = await api.get(`law-literature/show/${id}`)
      if (response.status === 200) {
        const res = response.data['law-literature']
        setYearId(res.year)
        setLawConfirmDepartmentId(res.confirm_gov)
        setTitle({
          tm:res[`title_tm`],
          ru:res[`title_ru`],
          en:res[`title_en`]
        })
        setText({
          tm:res[`text_tm`],
          ru:res[`text_ru`],
          en:res[`text_en`]
        })
        setConfirmedDate(returnRfcDateFormat(res.acception_date))

        setImg(res.image)
        setData(res)
        // if (response.data['law-literature'].image) {
        //   const res = await api.get(`${API_URL.split('/api')[0]}/assets/images/law-literatures/${response.data['law-literature'].image}`);
        //   const imageBlob = await res.blob();
        //   const imageObjectURL = URL.createObjectURL(imageBlob);
        //   setImg(imageObjectURL);
        // }
      }
    }
    catch (e) {
      history.push('/laws')
      toast.error('Käbir ýalňyşlyk')
    }
    dispatch(setLoading(false))

  }

  useEffect(() => {
    if (!years || years?.length < 1) {
      dispatch(loadYears())
    }
    if (!lawConfirmDepartments || lawConfirmDepartments?.length < 1) {
      dispatch(loadLawConfirmDepartments())

    }
    fetchData()
  }, [])

  
  return (
    <>

      <AppLayout>
        <form onSubmit={e => onSubmit(e)} className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl">
          <h1 className="text-2xl font-montserrat-bold"> Hukuk edebiýaty goşmak </h1>
          <p className="text-red-400 my-3"> ÜNS beriň gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly. </p>

          {editImage ?
            <>
              <LiteratureFileAddImage newCropedImage={newCropedImage} setNewCropedImage={setNewCropedImage} />
              <button
                type="button"
                onClick={() => { setEditImage(false) }}
                className="bg-gray-50 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2 mx-2"
              >
                {t('cancel')}
              </button>
            </> :
            <img
              className="w-36 my-3 rounded-xl"
              onClick={() => { setEditImage(true) }}
              src={`http://95.85.124.22:1010/assets/images/law-literatures/${img}`}
              alt="Image"
              srcSet={`http://95.85.124.22:1010/assets/images/law-literatures/${img}`}
            />



          }
          <aside className="flex flex-col my-4">
            <label className="flex items-center font-bold" htmlFor="title_tm">
              <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
              Hukuk edebiýat ady
              <p className="text-red-500 text-lg mx-2">*</p>
            </label>
            <input
              id="title_tm"
              type="text"
              required
              value={title.tm}
              onChange={e => setTitle({ ...title, tm: e.target.value })}
              placeholder="Hukuk edebiýat sözbaşyny giriziň"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
            />
          </aside>

          <aside className="flex flex-col my-4">
            <label className="flex items-center font-bold" htmlFor="title_ru">
              <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
              Hukuk edebiýat ady
            </label>
            <input
              id="title_ru"
              required
              type="text"
              value={title.ru}
              onChange={e => setTitle({ ...title, ru: e.target.value })}
              placeholder="Hukuk edebiýat sözbaşyny giriziň"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
            />
          </aside>

          <aside className="flex flex-col my-4">
            <label className="flex items-center font-bold" htmlFor="title_en">
              <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
              Hukuk edebiýat ady
            </label>
            <input
              id="title_en"
              type="text"
              value={title.en}
              onChange={e => setTitle({ ...title, en: e.target.value })}
              placeholder="Hukuk edebiýat sözbaşyny giriziň"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
            />
          </aside>



          <aside className="flex flex-col my-4">
            <label className="flex items-center font-bold mb-2" htmlFor="text_tm">
              <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
              Hukuk edebiýat ýazgysy
              <p className="text-red-500 text-lg mx-2">*</p>
            </label>

            <CKEditor
                    editor={DecoupledEditor}
                    onReady={(editor) => {
                      editor.ui
                        .getEditableElement()
                        .parentElement.insertBefore(
                          editor.ui.view.toolbar.element,
                          editor.ui.getEditableElement()
                        );
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setText({ ...text, tm: data })
                    }}
                    data={(data && data.text_tm)||'<p> </p>'}
            />
          </aside>


          <aside className="flex flex-col my-4">
            <label className="flex items-center font-bold mb-2" htmlFor="text_ru">
              <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
              Hukuk edebiýat ýazgysy
              <p className="text-red-500 text-lg mx-2">*</p>
            </label>

            <CKEditor
                    editor={DecoupledEditor}
                    onReady={(editor) => {
                      editor.ui
                        .getEditableElement()
                        .parentElement.insertBefore(
                          editor.ui.view.toolbar.element,
                          editor.ui.getEditableElement()
                        );
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setText({ ...text, ru: data })
                    }}
                    data={(data && data.text_ru)||'<p> </p>'}

            />
          </aside>


          <aside className="flex flex-col my-4">
            <label className="flex items-center font-bold mb-2" htmlFor="text_en">
              <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
              Hukuk edebiýat ýazgysy
            </label>

            <CKEditor
                    editor={DecoupledEditor}
                    onReady={(editor) => {
                      editor.ui
                        .getEditableElement()
                        .parentElement.insertBefore(
                          editor.ui.view.toolbar.element,
                          editor.ui.getEditableElement()
                        );
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setText({ ...text, en: data })
                    }}
                    data={(data && data.text_en)||'<p> </p>'}

            />
            
          </aside>



          <aside className="grid grid-cols-12 gap-5">

                    <div className="col-span-12 lg:col-span-6 flex flex-col">
                        <label className="flex items-center font-bold" htmlFor="confirmed_date">
                           Senesi
                        </label>
                        <input
                            id="confirmed_date"
                            type="date"
                            required
                            value={confirmedDate}
                            onChange={e => setConfirmedDate(e.target.value)}
                            placeholder="Senesi"
                            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
                        />
                    </div>
                </aside>



          <aside className="grid grid-cols-12 gap-5 my-5">
            {
              lawConfirmDepartments && lawConfirmDepartments.length > 0 &&
              <div className="col-span-12 lg:col-span-6 flex flex-col">
                <label className="flex items-center font-bold" htmlFor="department_id">
                  {t('confirm_department')}
                </label>
                <select
                  onChange={e => setLawConfirmDepartmentId(e.target.value)}
                  className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 my-2 px-4 py-3"
                >
                  {
                    lawConfirmDepartments.map((lawConfirmDepartment, index) => {
                      return (
                        <option key={index} value={lawConfirmDepartment.id}> {lawConfirmDepartment.name} </option>
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
                  {t('confirmation_year')}
                </label>
                <select
                  onChange={e => setYearId(e.target.value)}
                  defaultChecked={yearId}
                  className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 my-2 px-4 py-3"
                >
                  {
                    years.map((year, index) => {
                      return (
                        <option key={index}  value={year.id}> {year.year} </option>
                      )
                    })
                  }
                </select>
              </div>
            }
          </aside>




          <aside className="flex items-center justify-center mt-7">
            <NavLink
              to={`/laws`}
              className="bg-gray-50 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2 mx-2"
            >
              {t('cancel')}
            </NavLink>

            <button
              type="submit"
              className="bg-white text-green-700 border border-green-700 hover:bg-green-700 hover:text-white duration-300 font-bold rounded-lg px-5 py-2 mx-2"
            >
              {t('save')}
            </button>
          </aside>


        </form>
      </AppLayout>
    </>
  );
};

export default LiteratureEdit;
