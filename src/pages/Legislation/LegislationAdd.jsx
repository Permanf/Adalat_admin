import { useTranslation } from "react-i18next";
import { useState ,useEffect} from "react";
import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";
import { useSelector, useDispatch } from "react-redux";
import AppLayout from "../../layouts/AppLayout";
import { NavLink, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { storeLegislation, setParentLegislation } from "../../redux/actions/legislationAction";
import api from "../../services/api.service";

const LegislationAdd = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [datas, setData] = useState({});
  const parents=useSelector((state)=>state.legislations.parents)
  const saveCategory = (e) => {
    e.preventDefault();


    dispatch(storeLegislation(datas));

    setTimeout(() => {
      window.location.assign(`/legislations`);
    }, 1500);
  };
  useEffect(() => {
    api.get("legislation_parents").then((res) => {
      dispatch(setParentLegislation(res.data.data));
    });
    
  },[]);

  return (
    <AppLayout>
      <form
        onSubmit={(e) => saveCategory(e)}
        className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl"
      >
        <h1 className="text-xl font-montserrat-bold pb-4">
          Kanunçylyk goşmak
        </h1>
        <p className="text-red-400 mt-3 mb-5">
          ÜNS BERIŇ. Gyzyl ýyldyzjyk bilen belenen öýjükleri hökman
          doldurmaly.
        </p>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="title_tm">
            <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
            Kanunçylyk ady
            <p className="text-red-500 text-lg mx-2">*</p>
          </label>
          <input
            id="title_tm"
            type="text"
            required
            onChange={(e) => setData({ ...datas, title_tm: e.target.value })}
            placeholder="Kanunçylygyň sözbaşysyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="title_ru">
            <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
            Kanunçylyk ady
          </label>
          <input
            id="title_ru"
            type="text"
            onChange={(e) => setData({ ...datas, title_ru: e.target.value })}
            placeholder="Kanunçylygyň sözbaşysyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="title_en">
            <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
            Kanunçylyk ady
          </label>
          <input
            id="title_en"
            type="text"
            onChange={(e) => setData({ ...datas, title_en: e.target.value })}
            placeholder="Kanunçylygyň sözbaşysyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold mb-2" htmlFor="text_tm">
            <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
            Kanunçylyk ýazgysy
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
              setData({ ...datas, description_tm: data });
            }}
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold mb-2" htmlFor="text_ru">
            <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
            Kanunçylyk ýazgysy
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
              setData({ ...datas, description_ru: data });
            }}
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold mb-2" htmlFor="text_en">
            <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
            Kanunçylyk ýazgysy
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
              setData({ ...datas, description_en: data });
            }}
          />
        </aside>
        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="parent_id">
            Saýlaň
            <p className="text-red-500 text-lg mx-2">*</p>
          </label>
          <select id="parent_id" 
           defaultValue={t("Birini saýlaň")}
           onChange={(e) => setData({ ...datas, parent_id: e.target.value })}
           className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3 ">
             <option value={""}>{t("")}</option>
            {parents && parents.map(le => 
            (<option value={le.id} key={`le-${le.id}`}>{le.title_tm}</option>))}
  
          </select>
        </aside>
        <div className="flex items-center justify-between">
          <button className="bg-green-500 hover:bg-green-700 duration-300 text-white px-5 py-2.5 rounded-lg">
            {t("save")}
          </button>

          <NavLink
            to="/legislations"
            className="bg-gray-100 hover:bg-gray-200 duration-300 text-gray-600 px-5 py-2.5 rounded-lg"
          >
            {t("cancel")}
          </NavLink>
        </div>
      </form>
    </AppLayout>
  );
};
export default LegislationAdd;
