import { useState, useEffect } from "react";
import api from "../../../services/api.service";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../../layouts/AppLayout";
import TM_FLAG from "../../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../../assets/images/locales/en.jpg";
import { NavLink, useParams ,Redirect} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setLoading, setRedirect } from "../../../redux/reducers/mainReducer";
import {  setParentLegislation } from "../../../redux/actions/legislationAction";
import { putLegislationFile } from "../../../redux/actions/legislationFileAction";
import i18n from "../../../locales/i18next"
import { HiOutlineUpload } from "react-icons/hi";
import {
  IoArrowUndoOutline,
  IoInformationCircleOutline,
  IoTrashOutline,
} from "react-icons/io5";

const LegislationFilesEdit = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const locale = localStorage.getItem('locale')
  const [editLegislationFile, setEditLegislationFile] = useState([]);
  const redirect = useSelector((state) => state.main.redirect);
  const parents=useSelector((state)=>state.legislations.parents)
 
  useEffect(() => {
    api.get("legislation_parents").then((res) => {
      dispatch(setParentLegislation(res.data.data));
    });

  },[]);
  useEffect(async () => {
    try {
      const result = await  api.get(`legislation_files/${id}`);
     
      Object.keys(editLegislationFile).length === 0 && setEditLegislationFile(result.data.data);
     
    } catch (err) {
      console.log(err);
    }
  },[])

 
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", editLegislationFile.id);
    formData.append("file_title_tm", editLegislationFile.file_title_tm);
    formData.append("file_title_ru", editLegislationFile.file_title_ru);
    formData.append("legislation_id", editLegislationFile.legislation_id);
    formData.append("file_tm", editLegislationFile.file_tm);
    formData.append("file_ru", editLegislationFile.file_ru);
    formData.append("_method","PUT")
   
    // const payload = {
    //   id,
    //   title_tm: editLegislationFile.file_title_tm,
    //   title_ru: editLegislationFile.file_title_ru,
    //   file_tm:editLegislationFile.file_tm,
    //   file_ru:editLegislationFile.file_ru,
    //   legislation_id:editLegislationFile.legislation_id,
    //   _method:"PUT",
     
    // };
    console.log(formData)
    dispatch(putLegislationFile(formData));
    dispatch(setLoading(true));
    dispatch(setRedirect(true));
  };

  return (
    <>
      {redirect && <Redirect to={`/legislation_files`} />}
   
      <AppLayout>
        {Object.keys(editLegislationFile).length > 0 && (
          <form
            onSubmit={(e) => onSubmit(e)}
            className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl"
          >
            <h1 className="text-2xl font-montserrat-bold"> Faýllary üýtgetmek </h1>
            <p className="text-red-400 my-5">
              ÜNS beriň gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly.
            </p>

            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="file_title_tm">
                <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                Faýlyň ady
                <p className="text-red-500 text-lg mx-2">*</p>
              </label>
              <input
                id="file_title_tm"
                type="text"
                onChange={(e) =>
                  setEditLegislationFile({
                    ...editLegislationFile,
                    file_title_tm: e.target.value ,
                  })
                }
                value={editLegislationFile.file_title_tm ? editLegislationFile.file_title_tm : "" }
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
                onChange={(e) =>
                  setEditLegislationFile({
                    ...editLegislationFile,
                    file_title_ru: e.target.value ,
                  })
                }
                value={editLegislationFile.file_title_ru ? editLegislationFile.file_title_ru : "" }
                placeholder="Faýlyň sözbaşysyny giriziň"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>

            {/* <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="title_en">
                <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                Kanunçylygyň ady
              </label>
              <input
                id="title_en"
                type="text"
                onChange={(e) =>
                  setEditLegislationFile({
                    ...editLegislationFile,
                    title_en: e.target.value ,
                  })
                }
                value={editLegislationFile.title_en ? editLegislationFile.title_en : ""}
                placeholder="Kanunçylygyň sözbaşysyny giriziň"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside> */}

           
            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="legislation_id">
                Saýlaň
                <p className="text-red-500 text-lg mx-2">*</p>
              </label>
              <select id="legislation_id" 
                value={editLegislationFile.legislation_id !== null ? editLegislationFile.legislation_id : ""}
                
                onChange={(e) =>
                  setEditLegislationFile({
                    ...editLegislationFile,
                    legislation_id: e.target.value ,
                  })
                }
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3 ">
                 
                 {parents && parents
                 
                  .map(le => 
                  (<option key={`le-${le.id}`}  value={le.id}>{le[`title_${i18n.language}`]}</option>))}
      
              </select>
            </aside>
            <aside className="flex flex-col my-4">
            <label className="flex items-center font-bold" htmlFor="file_tm">
               Türkmen dilinde  faýl saýlaň  
                <p className="text-red-500 text-lg mx-2">*</p>
              </label>
              <input type="file" name="file_tm" onChange={(e)=>{
                setEditLegislationFile({
                  ...editLegislationFile,
                  file_tm : e.target.files[0]
              });
              }} />
             
                <p className="text-red-500 text-lg mx-2"> {editLegislationFile.file_tm ? "Faýl öň saýlanylan" : "Faýl saýlanylmady" }</p>
             
            </aside>
             <aside className="flex flex-col my-4">
             <label className="flex items-center font-bold" htmlFor="file_ru">
               Rus dilinde faýl saýlaň  
                <p className="text-red-500 text-lg mx-2">*</p>
              </label>
             <input type="file" name="file_ru" onChange={(e)=>{
                setEditLegislationFile({
                  ...editLegislationFile,
                  file_ru : e.target.files[0]
             })
              }} />
              <p className="text-red-500 text-lg mx-2">{editLegislationFile.file_ru ? "Faýl öň saýlanylan" : "Faýl saýlanylmady" }</p>
            </aside>
           
            <aside className="flex items-center justify-center mt-10">
              <NavLink
                to={`/legislation_files`}
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

export default LegislationFilesEdit;
