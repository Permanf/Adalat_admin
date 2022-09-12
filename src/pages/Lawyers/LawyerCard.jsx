import { useTranslation } from "react-i18next";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import getByLocale from "../../helpers/getByLocale";

const LawyerCard = ({ lawyer, deleting }) => {
  const { t } = useTranslation();

  return (
    <aside className="col-span-12 lg:col-span-6 bg-white shadow-gray-sm p-5 rounded-lg relative">
      <h1 className="font-bold mb-3"> {getByLocale(lawyer.title)} </h1>
      <NavLink to={`lawyer/${lawyer.id}/comments`} className="text-green-600">
        Teswirler ({lawyer.comments_count})
      </NavLink>

      <div className="flex absolute top-2 right-2">
        <NavLink
          to={`/lawyer/${lawyer.id}/edit`}
          className="border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white p-1 text-sm mr-2 duration-300 rounded-md"
        >
          <IoPencilOutline size={20} />
        </NavLink>

        <button
          onClick={() => deleting(true, lawyer.id)}
          className="border border-red-500 hover:bg-red-500 text-red-500 hover:text-white p-1 text-sm duration-300 rounded-md"
        >
          <IoTrashOutline size={20} />
        </button>
      </div>
    </aside>
  );
};

export default LawyerCard;
