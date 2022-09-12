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
import { putLegislation ,setLegislations, setParentLegislation} from "../../redux/actions/legislationAction";
import getByLocale from "../../helpers/getByLocale";

const LegislationEdit = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const [editLegislation, setEditLegislation] = useState([]);
  const redirect = useSelector((state) => state.main.redirect);
  const parents=useSelector((state)=>state.legislations.parents)
  useEffect(async () => {
    try {
      const result = await  api.get(`legislations/${id}`);
     
      Object.keys(editLegislation).length === 0 && setEditLegislation(result.data.data);
     
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    api.get("legislation_parents").then((res) => {
      dispatch(setParentLegislation(res.data.data));
      
    });
   
  },[redirect]);
  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id,
      title_tm: editLegislation.title_tm,
      title_ru: editLegislation.title_ru,
      title_en: editLegislation.title_en,
      description_tm: editLegislation.description_tm,
      description_ru: editLegislation.description_ru,
      description_en: editLegislation.description_en,
      parent_id:editLegislation.parent_id,
      _method:"PUT",
     
    };

    dispatch(putLegislation(payload));
    dispatch(setLoading(true));
    dispatch(setRedirect(true));
  };

  return (
    <>
      {redirect && <Redirect to={`/legislations/${id}/show`} />}
   
      <AppLayout>
        {Object.keys(editLegislation).length > 0 && (
          <form
            onSubmit={(e) => onSubmit(e)}
            className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl"
          >
            <h1 className="text-2xl font-montserrat-bold"> Kanunçylyk üýtgetmek </h1>
            <p className="text-red-400 my-5">
              ÜNS beriň gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly.
            </p>

            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="title_tm">
                <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                Kanunçylygyň ady
                <p className="text-red-500 text-lg mx-2">*</p>
              </label>
              <input
                id="title_tm"
                type="text"
                onChange={(e) =>
                  setEditLegislation({
                    ...editLegislation,
                    title_tm: e.target.value ,
                  })
                }
                value={editLegislation.title_tm ? editLegislation.title_tm : "" }
                placeholder="Kanunçylygyň sözbaşysyny giriziň"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="title_ru">
                <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                Kanunçylygyň ady
              </label>
              <input
                id="title_ru"
                type="text"
                onChange={(e) =>
                  setEditLegislation({
                    ...editLegislation,
                    title_ru: e.target.value ,
                  })
                }
                value={editLegislation.title_ru ? editLegislation.title_ru : "" }
                placeholder="Kanunçylygyň sözbaşysyny giriziň"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="title_en">
                <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                Kanunçylygyň ady
              </label>
              <input
                id="title_en"
                type="text"
                onChange={(e) =>
                  setEditLegislation({
                    ...editLegislation,
                    title_en: e.target.value ,
                  })
                }
                value={editLegislation.title_en ? editLegislation.title_en : ""}
                placeholder="Kanunçylygyň sözbaşysyny giriziň"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label
                className="flex items-center font-bold mb-2"
                htmlFor="text_tm"
              >
                <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                Kanunçylygyň ýazgysy
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
                  setEditLegislation({ ...editLegislation, description_tm: data });
                }}
                data={editLegislation.description_tm ? editLegislation.description_tm : ""}
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label
                className="flex items-center font-bold mb-2"
                htmlFor="text_ru"
              >
                <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                Kanunçylygyň ýazgysy
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
                  setEditLegislation({ ...editLegislation, description_ru: data });
                }}
                data={editLegislation.description_ru ? editLegislation.description_ru : "" }
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label
                className="flex items-center font-bold mb-2"
                htmlFor="text_en"
              >
                <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                Kanunçylygyň ýazgysy
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
                  setEditLegislation({ ...editLegislation, description_en: data });
                }}
                data={editLegislation.description_en ? editLegislation.description_en : "" }
              />
            </aside>
            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="parent_id">
                Saýlaň
                <p className="text-red-500 text-lg mx-2">*</p>
              </label>
              <select id="parent_id" 
                value={editLegislation.parent_id !== null ? editLegislation.parent_id.id : ""}
                
                onChange={(e) =>
                  setEditLegislation({
                    ...editLegislation,
                    parent_id: e.target.value ,
                  })
                }
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3 ">
                 <option value={""}>{t("")}</option>
                 {parents && parents
                 .filter(le => le.id !== editLegislation.id)
                  .map(le => 
                  (<option key={`le-${le.id}`}  value={le.id}>{le.title_tm}</option>))}
      
              </select>
            </aside>
          

            <aside className="flex items-center justify-center mt-10">
              <NavLink
                to={`/legislations/${id}/show`}
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

export default LegislationEdit;
