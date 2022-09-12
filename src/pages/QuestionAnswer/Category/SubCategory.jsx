import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import getByLocale from "../../../helpers/getByLocale";

const SubCategory = ({ category, toggleEditModal, toggleDeleteModal }) => {
  return (
    <aside className="bg-white mb-2 flex items-center justify-between rounded-lg">
      <NavLink
        to={`/question_answer/subcategory/${category.id}`}
        className="flex flex-col px-4 py-2 w-full rounded-lg"
      >
        <h1 className="text-md">
          {category.title && getByLocale(category.title)}
        </h1>
        <small className="text-gray-400">
          Jogaplar: {category.question_answers_count}
        </small>
      </NavLink>

      <div className="flex px-2">
        <button
          onClick={() => toggleEditModal(category)}
          className="border border-blue-600 text-blue-500 hover:bg-blue-500 hover:text-white w-8 h-8 rounded-full flex items-center justify-center mr-2"
        >
          <IoPencilOutline size={18} />
        </button>

        <button
          onClick={() => toggleDeleteModal(category.id)}
          className="border border-red-600 text-red-500 hover:bg-red-500 hover:text-white w-8 h-8 rounded-full flex items-center justify-center"
        >
          <IoTrashOutline size={18} />
        </button>
      </div>
    </aside>
  );
};
export default SubCategory;
