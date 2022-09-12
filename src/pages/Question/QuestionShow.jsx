import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoArchiveOutline, IoArrowUndoOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { getQuestion } from "../../redux/actions/questionAction";

const QuestionShow = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const question = useSelector((state) => state.question.question);

  useEffect(() => {
    dispatch(getQuestion(id));
  }, []);

  return (
    <AppLayout>
      <aside className="bg-white flex items-center px-5 py-3 rounded-lg">
        <button
          onClick={() => history.goBack()}
          className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full"
        >
          <IoArrowUndoOutline size={24} />
        </button>
        <h1 className="text-lg font-bold font-montserrat-bold text-gray-700 capitalize ml-4">
          {question && question.fullname}
        </h1>
      </aside>

      <main className="bg-white px-5 py-3 my-5 rounded-md">
        <aside className="flex items-center justify-between">
          <h1 className="font-montserrat-bold text-lg"> Maglumat </h1>
          {question.archive && question.archive.file && (
            <a
              href={question.archive.file}
              data-tip="Arhiwyny ýükläp al"
              className="border border-green-600 hover:border-green-500 hover:bg-green-500 hover:text-white text-green-500 duration-300 p-2 rounded-lg ml-2"
            >
              <IoArchiveOutline size={24} />
            </a>
          )}
        </aside>

        <table className="w-full">
          <tr>
            <td className="py-2 text-gray-500">Ady:</td>
            <td className="py-2 text-gray-900 capitalize ml-3">
              {question.firstname ?? "näbelli"}
            </td>
          </tr>

          <tr>
            <td className="py-2 text-gray-500">Familiýasy:</td>
            <td className="py-2 text-gray-900 capitalize ml-3">
              {question.lastname ?? "näbelli"}
            </td>
          </tr>

          <tr>
            <td className="py-2 text-gray-500">Atasynyň ady:</td>
            <td className="py-2 text-gray-900 capitalize ml-3">
              {question.fathername ?? "näbelli"}
            </td>
          </tr>

          <tr>
            <td className="py-2 text-gray-500">Email:</td>
            <td className="py-2 text-gray-900 ml-3">
              {question.email ?? "näbelli"}
            </td>
          </tr>

          <tr>
            <td className="py-2 text-gray-500">Telefon:</td>
            <td className="py-2 text-gray-900 ml-3">
              {question.phone ?? "näbelli"}
            </td>
          </tr>

          <tr>
            <td className="py-2 text-gray-500">Welaýat (şäher):</td>
            <td className="py-2 text-gray-900 ml-3">
              {question.province ?? "näbelli"}
            </td>
          </tr>

          <tr>
            <td className="py-2 text-gray-500">Salgy:</td>
            <td className="py-2 text-gray-900 ml-3">
              {question.address ?? "näbelli"}
            </td>
          </tr>

          <tr>
            <td className="py-2 text-gray-500">Hasaba alynan sene:</td>
            <td className="py-2 text-gray-900 ml-3">
              {question.created_at ?? "näbelli"}
            </td>
          </tr>
        </table>
      </main>
    </AppLayout>
  );
};

export default QuestionShow;
