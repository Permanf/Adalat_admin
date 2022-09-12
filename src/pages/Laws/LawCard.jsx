import { useTranslation } from "react-i18next";
import {
  IoDocumentTextOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Collapse from "../../components/Collapse/Collapse";
import getByLocale from "../../helpers/getByLocale";

const LawCard = ({ law, editing, deleting }) => {
  const { t } = useTranslation();

  return (
    <aside className="flex lg:items-center justify-between px-4 py-2 border-b border-gray-50 relative">
      <NavLink to={`law/${law.id}`} className="flex text-gray-800">
        <p> {getByLocale(law.title)} </p>
      </NavLink>

      <Collapse className="w-56 text-sm">
        <button
          onClick={() => editing(true, law)}
          className="flex hover:bg-gray-100 duration-300 text-left border-b text-green-700 w-full px-5 py-2"
        >
          <IoPencilOutline className="mr-2" size={20} /> {t("edit")}
        </button>

        <button
          onClick={() => deleting(true, law.id)}
          className="flex hover:bg-gray-100 duration-300 text-left border-b text-red-500 w-full px-5 py-2"
        >
          <IoTrashOutline className="mr-2" size={20} /> {t("remove")}
        </button>
      </Collapse>
    </aside>
  );
};

export default LawCard;
