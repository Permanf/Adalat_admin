import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoAddCircleOutline,
  IoArrowUndoOutline,
  IoDocumentAttachOutline,
  IoDocumentTextOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory,Redirect } from "react-router-dom";
import Collapse from "../../../components/Collapse/Collapse";
import EmptyList from "../../../components/Empty/EmptyList";
import SmallModal from "../../../components/Modal/SmallModal";
import getByLocale from "../../../helpers/getByLocale";
import AppLayout from "../../../layouts/AppLayout";
import {  deleteQuestionAnswer, getCategoryQuestionAnswers } from "../../../redux/actions/questionAnswerAction";
import { setLoading, setRedirect } from "../../../redux/reducers/mainReducer";


const SubCategoryShow = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const subcategory = useSelector((state) => state.questionAnswer.category_question_answers);
  const question_answers = useSelector((state) => state.questionAnswer.category_question_answers.question_answers);
  const [deleteConfirm, setDeleteConfirm] = useState([]);
  const redirect = useSelector((state) => state.main.redirect);
  const deleting = () => {
    dispatch(deleteQuestionAnswer(deleteConfirm.id));
    setDeleteConfirm({ delete: false, id: null });
    dispatch(setLoading(true))
    dispatch(setRedirect(true))
  };
  const handleDeleting = (confirmation, qa_id) => {
    setDeleteConfirm({ delete: confirmation, id: qa_id });
  };

  useEffect(() => {
   
    dispatch(getCategoryQuestionAnswers(id));
  });

  return (
    <>
      {redirect && <Redirect to={`/question_answer/subcategory/${id}`} />}
      {deleteConfirm.delete && (
        <SmallModal isOpen={deleteConfirm.delete}>
          <aside className="flex flex-col items-center justify-center">
            <h1 className="font-montserrat-bold text-xl">
              {t("confirm_delete")}
            </h1>

            <div className="flex mt-3">
              <button
                onClick={() => deleting()}
                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 rounded-lg px-6 py-2 my-2 mr-4"
              >
                {t("yes")}
              </button>

              <button
                onClick={() => handleDeleting(false, null)}
                className="bg-gray-100 text-gray-800 duration-300 rounded-lg px-6 py-2 my-2"
              >
                {t("no")}
              </button>
            </div>
          </aside>
        </SmallModal>
      )}
      <AppLayout>
        {question_answers && question_answers.length !== 0 && (
          <aside className="bg-white p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => history.goBack()}
                className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 mr-2 rounded-full"
              >
                <IoArrowUndoOutline size={24} />
              </button>
              <div className="flex flex-col">
                <h1 className="text-base lg:text-xl font-bold font-montserrat-bold text-gray-800">
                  {subcategory && subcategory.title && getByLocale(subcategory.title)}
                </h1>
                <small className="flex font-montserrat-medium text-base text-gray-500">
                  <p>{t("total")}:</p>
                  <p className="ml-2">{question_answers && question_answers.length}</p>
                </small>
              </div>
            </div>

            <NavLink
              to={`/question_answer/subcategory/${id}/add`}
              className="bg-white font-montserrat-medium text-green-600 hover:bg-green-600 hover:text-white border border-green-600 duration-300 flex items-center px-3 rounded-md py-2 text-sm"
            >
              <IoAddCircleOutline size={22} className="mr-2" /> {t("add")}
            </NavLink>
          </aside>
        )}

        {question_answers && question_answers.length === 0 && (
          <EmptyList message={t("empty_list")} />
        )}

        {question_answers && question_answers.length > 0 && (
          <main className="bg-white rounded-xl lg:px-5 my-5">
            {question_answers.map((qa, key) => {
              return (
                <aside
                  key={key}
                  className="lg:flex lg:items-center lg:justify-between px-4 py-3 hover:bg-gray-100 border-b border-gray-100 relative rounded-lg"
                >
                  <NavLink to={`/question_answer/subcategory/file/${qa.id}`}>
                    <p className="text-gray-800">
                      {getByLocale(qa.title)}
                    </p>
                  </NavLink>

                  <Collapse className="w-56 text-sm">
                   

                    <NavLink
                      to={`/question_answer/subcategory/file/${qa.id}/edit`}
                      className="flex hover:bg-gray-100 duration-300 text-left border-b text-green-700 w-full px-5 py-2"
                    >
                      <IoPencilOutline className="mr-2" size={20} /> {t("edit")}
                    </NavLink>

                    <button
                      type="button"
                      onClick={() => handleDeleting(true, qa.id)}
                      className="flex hover:bg-gray-100 duration-300 text-left border-b text-red-500 w-full px-5 py-2"
                    >
                      <IoTrashOutline className="mr-2" size={20} />
                      {t("remove")}
                    </button>
                  </Collapse>
                </aside>
              );
            })}
          </main>
        )}
      </AppLayout>
    </>
  );
};

export default SubCategoryShow;
