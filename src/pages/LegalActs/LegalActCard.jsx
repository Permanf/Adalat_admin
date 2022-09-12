import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoEyeOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { NavLink, useHistory } from "react-router-dom";




const LegalActCard = ({ act, deleteItem ,index,toggleRemoveModal}) => {
  const { t, i18n } = useTranslation();
  
  const history = useHistory()
  
// debugger
  return (
    
    <>
   
      {/* <LawsDelete isNotLaw={true} deleteConfirm={deleteConfirm} lawDelete={deleteLiterature} deleting={setDeleteConfirm}/> */}

      <tr className="hover:bg-gray-50 cursor-pointer" key={index} >
        <td className="p-3">
          <small>{act.registration_id}</small>
        </td>
        <td className="p-3">
          <p className="text-gray-700">{act[`title`]}</p>
        </td>
        
        <td className="p-3">
          <p className="text-gray-700">{act.registration_date}</p>
        </td>
        <td className="p-3 text-right">
          <div className="flex justify-end">
          <button
              onClick={() => {history.push(`/legalActs/${act.id}`)}}
              className="border border-green-400 hover:bg-green-500 text-green-500 hover:text-white text-xs duration-300 px-2 py-1 mr-2 rounded-md"
            >
              <IoEyeOutline size={20} />
            </button>
            <NavLink
              to={`/legalActs/edit/${act.id}`}
              className="border border-blue-400 hover:bg-blue-500 text-blue-500 hover:text-white text-xs duration-300 px-2 py-1 rounded-md mr-2"
            >
              <IoPencilOutline size={20} />
            </NavLink>
            <button
              onClick={() => {toggleRemoveModal(act.id)}}
              className="border border-red-400 hover:bg-red-500 text-red-500 hover:text-white text-xs duration-300 px-2 py-1 rounded-md"
            >
              <IoTrashOutline size={20} />
            </button>

          </div>
        </td>
      </tr>
    </>
  );
};

export default LegalActCard;
