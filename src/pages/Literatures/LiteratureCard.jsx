import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoDocumentTextOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { NavLink, useHistory } from "react-router-dom";
import Collapse from "../../components/Collapse/Collapse";
import getByLocale from "../../helpers/getByLocale";
import LawsDelete from "../Laws/LawsDelete";

const LiteratureCard = ({ literature,deleteItem }) => {
  const { t, i18n } = useTranslation();
  const [deleteConfirm,setDeleteConfirm] = useState(null)
  const history = useHistory()
  const deleteLiterature = ()=>{
    deleteItem(literature.id)
    setDeleteConfirm(null)
  }
  // debugger
  return (
    <>
    <LawsDelete isNotLaw={true} deleteConfirm={deleteConfirm} lawDelete={deleteLiterature} deleting={setDeleteConfirm}/>
      <aside className="flex lg:items-center justify-between px-4 py-2 border-b border-gray-50 relative">
        <NavLink to={`literature/${literature.id}`} className="flex text-gray-800">
          <p> {literature[`title`]} </p>
        </NavLink>

        <Collapse className="w-56 text-sm" >
          <button
            onClick={() => { history.push(`/literature/edit/${literature.id}`) }}
            className="flex hover:bg-gray-100 duration-300 text-left border-b text-green-700 w-full px-5 py-2"
          >
            <IoPencilOutline className="mr-2" size={20} /> {t("edit")}
          </button>

          <button
            onClick={() =>setDeleteConfirm(true)}
            className="flex hover:bg-gray-100 duration-300 text-left border-b text-red-500 w-full px-5 py-2"
          >
            <IoTrashOutline className="mr-2" size={20} /> {t("remove")}
          </button>
        </Collapse>
      </aside>
    </>
  );
};

export default LiteratureCard;
