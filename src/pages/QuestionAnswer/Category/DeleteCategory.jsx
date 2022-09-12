import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { deleteQuestionCategory } from "../../../redux/actions/questionAnswerAction";

const DeleteCategory = ({ category_id, close }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const deleteCategory = (e) => {
    e.preventDefault();

    dispatch(deleteQuestionCategory(category_id));

    setTimeout(() => {
      window.location.assign("/question_answer");
      close();
    }, 2000);
  };

  return (
    <main className="flex flex-col items-center justify-center p-5">
      <h1 className="text-2xl font-montserrat-bold"> Pozmagy tassyklaň </h1>
      <aside className="flex items-center justify-center mt-5">
        <button
          onClick={deleteCategory}
          className="bg-white text-red-700 border border-red-700 hover:bg-red-700 hover:text-white duration-300 font-bold rounded-lg px-4 py-2 mr-2"
        >
          Hawa
        </button>
        <button
          onClick={() => close()}
          className="bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 font-bold duration-300 border border-gray-200 rounded-lg px-4 py-2 ml-2"
        >
          Ýok
        </button>
      </aside>
    </main>
  );
};
export default DeleteCategory;
