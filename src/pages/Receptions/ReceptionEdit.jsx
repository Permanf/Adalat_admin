import { useState, useEffect } from "react";
import api from "../../services/api.service";
import { useDispatch, useSelector } from "react-redux";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

import AppLayout from "../../layouts/AppLayout";
import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";
import { NavLink, useParams ,Redirect} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setLoading, setRedirect } from "../../redux/reducers/mainReducer";
import getByLocale from "../../helpers/getByLocale";
import { putReception } from "../../redux/actions/receptionAction";

const ReceptionEdit = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const [editData, setData] = useState([]);
  const redirect = useSelector((state) => state.main.redirect);
  
  useEffect(async () => {
    try {
      const result = await  api.get(`receptions/${id}`);
     
      Object.keys(editData).length === 0 && setData(result.data.data);
     
    } catch (err) {
      console.log(err);
    }
  }, []);
 
   

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id,
    //   title
      title_tm: editData.title_tm,
      title_ru: editData.title_ru,
      title_en: editData.title_en,
    //   contact
    contact_tm: editData.contact_tm,
    contact_ru: editData.contact_ru,
    contact_en: editData.contact_en,
    // address
    address_tm: editData.address_tm,
    address_ru: editData.address_ru,
    address_en: editData.address_en,
    // work_time
    work_time_tm: editData.work_time_tm,
    work_time_ru: editData.work_time_ru,
    work_time_en: editData.work_time_en,

      description_tm: editData.description_tm,
      description_ru: editData.description_ru,
      description_en: editData.description_en,
      _method:"PUT",
   
     
    };
    console.log(editData)
    dispatch(putReception(payload));
    dispatch(setLoading(true));
    dispatch(setRedirect(true));
  };

  return (
    <>
      {redirect && <Redirect to={`/receptions/${id}/show`} />}
   
      <AppLayout>
        {Object.keys(editData).length > 0 && (
          <form
            onSubmit={(e) => onSubmit(e)}
            className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl"
          >
            <h1 className="text-2xl font-montserrat-bold">Maslahat bermek ????tgetmek </h1>
            <p className="text-red-400 my-5">
              ??NS beri?? gyzyl ??yldyzjyk bilen belenen ????j??kleri h??kman doldurmaly.
            </p>
            {/* Maslahat title */}
            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="title_tm">
                <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                Maslahaty?? ady
                <p className="text-red-500 text-lg mx-2">*</p>
              </label>
              <input
                id="title_tm"
                type="text"
                onChange={(e) =>
                  setData({
                    ...editData,
                    title_tm: e.target.value ,
                  })
                }
                value={editData.title_tm ? editData.title_tm : "" }
                placeholder="Maslahaty?? s??zba??ysyny girizi??"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="title_ru">
                <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                Maslahaty?? ady
                <p className="text-red-500 text-lg mx-2">*</p>
              </label>
              <input
                id="title_ru"
                type="text"
                onChange={(e) =>
                  setData({
                    ...editData,
                    title_ru: e.target.value ,
                  })
                }
                value={editData.title_ru ? editData.title_ru : "" }
                placeholder="Maslahaty?? s??zba??ysyny girizi??"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="title_en">
                <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                Maslahaty?? ady
                <p className="text-red-500 text-lg mx-2">*</p>
              </label>
              <input
                id="title_en"
                type="text"
                onChange={(e) =>
                  setData({
                    ...editData,
                    title_en: e.target.value ,
                  })
                }
                value={editData.title_en ? editData.title_en : ""}
                placeholder="Maslahaty?? s??zba??ysyny girizi??"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>



             {/* Maslahat work_time */}
            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="work_time_tm">
                <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                I?? wagty
                {/* <p className="text-red-500 text-lg mx-2">*</p> */}
              </label>
              <input
                id="work_time_tm"
                type="text"
                onChange={(e) =>
                  setData({
                    ...editData,
                    work_time_tm: e.target.value ,
                  })
                }
                value={editData.work_time_tm ? editData.work_time_tm : "" }
                placeholder="I?? wagtyny girizi??"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="work_time_ru">
                <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                I?? wagty
                {/* <p className="text-red-500 text-lg mx-2">*</p> */}
              </label>
              <input
                id="work_time_ru"
                type="text"
                onChange={(e) =>
                  setData({
                    ...editData,
                    work_time_ru: e.target.value ,
                  })
                }
                value={editData.work_time_ru ? editData.work_time_ru : "" }
                placeholder="I?? wagtyny girizi??"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="work_time_en">
                <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                I?? wagty
                {/* <p className="text-red-500 text-lg mx-2">*</p> */}
              </label>
              <input
                id="work_time_en"
                type="text"
                onChange={(e) =>
                  setData({
                    ...editData,
                    work_time_en: e.target.value ,
                  })
                }
                value={editData.work_time_en ? editData.work_time_en : "" }
                placeholder="I?? wagtyny girizi??"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>
            {/* Maslahat contact */}
            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="contact_tm">
                <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                Habarla??mak ????in telefon belgileri
                {/* <p className="text-red-500 text-lg mx-2">*</p> */}
              </label>
              <input
                id="contact_tm"
                type="text"
                onChange={(e) =>
                  setData({
                    ...editData,
                   contact_tm: e.target.value ,
                  })
                }
                value={editData.contact_tm ? editData.contact_tm : "" }
                placeholder="Habarla??mak ????in telefon belgileri girizi??"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>
            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="contact_ru">
                <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                Habarla??mak ????in telefon belgileri
                {/* <p className="text-red-500 text-lg mx-2">*</p> */}
              </label>
              <input
                id="contact_ru"
                type="text"
                onChange={(e) =>
                  setData({
                    ...editData,
                   contact_ru: e.target.value ,
                  })
                }
                value={editData.contact_ru ? editData.contact_ru : "" }
                placeholder="Habarla??mak ????in telefon belgileri girizi??"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>
            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="contact_en">
                <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                Habarla??mak ????in telefon belgileri
                {/* <p className="text-red-500 text-lg mx-2">*</p> */}
              </label>
              <input
                id="contact_en"
                type="text"
                onChange={(e) =>
                  setData({
                    ...editData,
                   contact_en: e.target.value ,
                  })
                }
                value={editData.contact_en ? editData.contact_en : "" }
                placeholder="Habarla??mak ????in telefon belgileri girizi??"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>
            {/* Maslahat address */}
            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="address_tm">
                <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                Salgysy
                {/* <p className="text-red-500 text-lg mx-2">*</p> */}
              </label>
              <input
                id="address_tm"
                type="text"
                onChange={(e) =>
                  setData({
                    ...editData,
                   address_tm: e.target.value ,
                  })
                }
                value={editData.address_tm ? editData.address_tm : "" }
                placeholder="Salgylary girizi??"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>
            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="address_ru">
                <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                Salgysy
                {/* <p className="text-red-500 text-lg mx-2">*</p> */}
              </label>
              <input
                id="address_ru"
                type="text"
                onChange={(e) =>
                  setData({
                    ...editData,
                   address_ru: e.target.value ,
                  })
                }
                value={editData.address_ru ? editData.address_ru : "" }
                placeholder="Salgylary girizi??"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>
            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="address_en">
                <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                Salgysy
                {/* <p className="text-red-500 text-lg mx-2">*</p> */}
              </label>
              <input
                id="address_en"
                type="text"
                onChange={(e) =>
                  setData({
                    ...editData,
                   address_en: e.target.value ,
                  })
                }
                value={editData.address_en ? editData.address_en : "" }
                placeholder="Salgylary girizi??"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>
              {/* Maslahat yazgysy */}
            <aside className="flex flex-col my-4">
              <label
                className="flex items-center font-bold mb-2"
                htmlFor="text_tm"
              >
                <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                Maslahaty?? ??azgysy
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
                  setData({ ...editData, description_tm: data });
                }}
                data={editData.description_tm ? editData.description_tm : ""}
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label
                className="flex items-center font-bold mb-2"
                htmlFor="text_ru"
              >
                <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                Maslahaty?? ??azgysy
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
                  setData({ ...editData, description_ru: data });
                }}
                data={editData.description_ru ? editData.description_ru : "" }
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label
                className="flex items-center font-bold mb-2"
                htmlFor="text_en"
              >
                <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                Maslahaty?? ??azgysy
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
                  setData({ ...editData, description_en: data });
                }}
                data={editData.description_en ? editData.description_en : "" }
              />
            </aside>

            <aside className="flex items-center justify-center mt-10">
              <NavLink
                to={`/receptions/${id}/show`}
                className="bg-gray-50 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2 mx-2"
              >
                {t("cancel")}
              </NavLink>

              <button
                type="submit"
                className="bg-white text-green-700 border border-green-700 hover:bg-green-700 hover:text-white duration-300 font-bold rounded-lg px-5 py-2 mx-2"
              >
                {t("save")}
              </button>
            </aside>
          </form>
        )}
      </AppLayout>
     </>
  );
};

export default ReceptionEdit;
