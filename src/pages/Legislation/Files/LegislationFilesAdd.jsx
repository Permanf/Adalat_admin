import { useTranslation } from "react-i18next";
import { useState ,useEffect} from "react";
import TM_FLAG from "../../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../../assets/images/locales/en.jpg";
import { useSelector, useDispatch } from "react-redux";
import AppLayout from "../../../layouts/AppLayout";
import { NavLink, useParams } from "react-router-dom";
import { setLegislations, setParentLegislation } from "../../../redux/actions/legislationAction";
import { storeLegislationFile } from "../../../redux/actions/legislationFileAction";
import i18n from "../../../locales/i18next"
import api from "../../../services/api.service";

const LegislationFilesAdd = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [datas, setData] = useState({});
  const locale = localStorage.getItem('locale')
  const parents=useSelector((state)=>state.legislations.parents)
 
  useEffect(() => {
    api.get("legislation_parents").then((res) => {
      dispatch(setParentLegislation(res.data.data));
    });

  },[]);


  const saveCategory = (e) => {
    e.preventDefault();


    dispatch(storeLegislationFile(datas));

    setTimeout(() => {
      window.location.assign(`/legislation_files`);
    }, 1500);
  };
 

  return (
    <AppLayout>
      <form
        onSubmit={(e) => saveCategory(e)}
        className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl"
      >
        <h1 className="text-xl font-montserrat-bold pb-4">
          Faýl goşmak
        </h1>
        <p className="text-red-400 mt-3 mb-5">
          ÜNS BERIŇ. Gyzyl ýyldyzjyk bilen belenen öýjükleri hökman
          doldurmaly.
        </p>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="file_title_tm">
            <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
            Faýl ady
            <p className="text-red-500 text-lg mx-2">*</p>
          </label>
          <input
            id="file_title_tm"
            type="text"
            required
            onChange={(e) => setData({ ...datas, file_title_tm: e.target.value })}
            placeholder="Faýlyň sözbaşysyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="file_title_ru">
            <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
            Faýlyň ady
          </label>
          <input
            id="file_title_ru"
            type="text"
            onChange={(e) => setData({ ...datas, file_title_ru: e.target.value })}
            placeholder="Faýlyň sözbaşysyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        {/* <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="file_title_en">
            <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
            Faýlyň ady
          </label>
          <input
            id="file_title_en"
            type="text"
            onChange={(e) => setData({ ...datas, file_title_en: e.target.value })}
            placeholder="Faýlyň sözbaşysyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside> */}

       
        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="legislation_id">
            Saýlaň
            <p className="text-red-500 text-lg mx-2">*</p>
          </label>
          <select id="legislation_id" 
          
           onChange={(e) => setData({ ...datas, legislation_id: e.target.value })}
           className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3 ">
            
            {parents && parents.map(le => 
            (<option value={le.id} key={`le-${le.id}`}>{le[`title_${i18n.language}`]}</option>))}
  
          </select>
        </aside>
        <div className="flex items-center justify-between">
          <button className="bg-green-500 hover:bg-green-700 duration-300 text-white px-5 py-2.5 rounded-lg">
            {t("save")}
          </button>

          <NavLink
            to="/legislation_files"
            className="bg-gray-100 hover:bg-gray-200 duration-300 text-gray-600 px-5 py-2.5 rounded-lg"
          >
            {t("cancel")}
          </NavLink>
        </div>
      </form>
    </AppLayout>
  );
};
export default LegislationFilesAdd;
