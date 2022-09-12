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
import { storeReception } from "../../redux/actions/receptionAction";

const ReceptionAdd = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [datas, setData] = useState({});
  const saveCategory = (e) => {
    e.preventDefault();


    dispatch(storeReception(datas));

    setTimeout(() => {
      window.location.assign(`/receptions`);
    }, 1500);
  };
 

  return (
    <AppLayout>
      <form
        onSubmit={(e) => saveCategory(e)}
        className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl"
      >
        <h1 className="text-xl font-montserrat-bold pb-4">
          Maslahat goşmak
        </h1>
        <p className="text-red-400 mt-3 mb-5">
          ÜNS BERIŇ. Gyzyl ýyldyzjyk bilen belenen öýjükleri hökman
          doldurmaly.
        </p>
        {/* Maslahat ady */}
        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="title_tm">
            <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
            Maslahat ady
            <p className="text-red-500 text-lg mx-2">*</p>
          </label>
          <input
            id="title_tm"
            type="text"
            required
            onChange={(e) => setData({ ...datas, title_tm: e.target.value })}
            placeholder="Maslahatyň sözbaşysyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="title_ru">
            <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
            Maslahat ady
            <p className="text-red-500 text-lg mx-2">*</p>
          </label>
          <input
            id="title_ru"
            type="text"
            required
            onChange={(e) => setData({ ...datas, title_ru: e.target.value })}
            placeholder="Maslahatyň sözbaşysyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="title_en">
            <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
            Maslahat ady
            <p className="text-red-500 text-lg mx-2">*</p>
          </label>
          <input
            id="title_en"
            type="text"
            onChange={(e) => setData({ ...datas, title_en: e.target.value })}
            placeholder="Maslahatyň sözbaşysyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>
        {/* Maslahat work_time */}
        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="work_time_tm">
            <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
            Iş wagty
           
          </label>
          <input
            id="work_time_tm"
            type="text"
            // required
            onChange={(e) => setData({ ...datas, work_time_tm: e.target.value })}
            placeholder="Iş wagtyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="work_time_ru">
            <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
            Iş wagty
          </label>
          <input
            id="work_time_ru"
            type="text"
            onChange={(e) => setData({ ...datas, work_time_ru: e.target.value })}
            placeholder="Iş wagtyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="work_time_en">
            <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
            Iş wagty
          </label>
          <input
            id="work_time_en"
            type="text"
            onChange={(e) => setData({ ...datas, work_time_en: e.target.value })}
            placeholder="Iş wagtyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>
        {/* Maslahat contact */}
        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="contact_tm">
            <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
            Habarlaşmak üçin
            
          </label>
          <input
            id="contact_tm"
            type="text"
            // required
            onChange={(e) => setData({ ...datas, contact_tm: e.target.value })}
            placeholder="Habarlaşmak üçin telefon belgileri giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="contact_ru">
            <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
            Habarlaşmak üçin
          </label>
          <input
            id="contact_ru"
            type="text"
            onChange={(e) => setData({ ...datas, contact_ru: e.target.value })}
            placeholder="Habarlaşmak üçin telefon belgileri giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="contact_en">
            <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
           Habarlaşmak üçin
          </label>
          <input
            id="contact_en"
            type="text"
            onChange={(e) => setData({ ...datas, contact_en: e.target.value })}
            placeholder="Habarlaşmak üçin telefon belgileri giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>
        {/* Maslahat address */}
        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="address_tm">
            <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
            Salgysy
            
          </label>
          <input
            id="address_tm"
            type="text"
            // required
            onChange={(e) => setData({ ...datas, address_tm: e.target.value })}
            placeholder="Salgysyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="address_ru">
            <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
            Salgysy
          </label>
          <input
            id="address_ru"
            type="text"
            onChange={(e) => setData({ ...datas, address_ru: e.target.value })}
            placeholder="Salgysyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="address_en">
            <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
            Salgysy
          </label>
          <input
            id="address_en"
            type="text"
            onChange={(e) => setData({ ...datas, address_en: e.target.value })}
            placeholder="Salgysyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>


        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold mb-2" htmlFor="text_tm">
            <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
            Maslahatyň ýazgysy
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
            Maslahatyň ýazgysy
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
              setData({ ...datas, description_ru: data });
            }}
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold mb-2" htmlFor="text_en">
            <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
            Maslahatyň ýazgysy
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
              setData({ ...datas, description_en: data });
            }}
          />
        </aside>
       
        <div className="flex items-center justify-between">
          <button className="bg-green-500 hover:bg-green-700 duration-300 text-white px-5 py-2.5 rounded-lg">
            {t("save")}
          </button>

          <NavLink
            to="/receptions"
            className="bg-gray-100 hover:bg-gray-200 duration-300 text-gray-600 px-5 py-2.5 rounded-lg"
          >
            {t("cancel")}
          </NavLink>
        </div>
      </form>
    </AppLayout>
  );
};
export default ReceptionAdd;
