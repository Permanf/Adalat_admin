import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import EmptyList from "../../../components/Empty/EmptyList";
import getByLocale from "../../../helpers/getByLocale";
import AppLayout from "../../../layouts/AppLayout";
import { getCategoryQuestionAnswers, getQuestionAnswer } from "../../../redux/actions/questionAnswerAction";
import ReactHtmlParser from "react-html-parser";

const SubCategoryShow = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const category_question_answers = useSelector(
    (state) => state.questionAnswer.category_question_answers
  );
  const question_answer=useSelector((state) => state.questionAnswer.question_answer)

  useEffect(() => {
    dispatch(getCategoryQuestionAnswers(id));
    dispatch(getQuestionAnswer(191))

  }, []);
  // console.log('question_answer',question_answer)
  return (
    <>
      <AppLayout>
        <header className="bg-white px-5 py-3 rounded-lg flex items-center justify-between">
          <aside className="flex items-center">
            <button
              onClick={() => history.goBack()}
              className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full"
            >
              <IoArrowUndoOutline size={24} />
            </button>
            <div className="flex flex-col ml-4">
              <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
                {category_question_answers && category_question_answers.title
                  ? getByLocale(category_question_answers.title)
                  : t("question_answer")}
              </h1>
              <small>
                {t("total")}:
                {category_question_answers &&
                  category_question_answers.question_answers &&
                  category_question_answers.question_answers.length}
              </small>
            </div>
          </aside>

          <NavLink
            to={`/question_answer/subcategory/${category_question_answers.id}/add/`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            {t("add")}
          </NavLink>
        </header>

        {category_question_answers &&
          category_question_answers.question_answers &&
          category_question_answers.question_answers.length === 0 && (
            <EmptyList message={t("empty_list")} />
          )}

        {category_question_answers &&
          category_question_answers.question_answers &&
          category_question_answers.question_answers.length > 0 && (
            <main className="my-5">
              {category_question_answers.question_answers.map((qa, index) => {
                return (
                  <aside
                    key={index}
                    className="bg-white px-4 py-2 rounded-lg mb-2"
                  >
                    <h1 className="text-lg text-green-600 font-montserrat-bold">
                      {qa.title && getByLocale(qa.title)}
                    </h1>
                    <p className="text-gray-400">
                      {qa.text && ReactHtmlParser(getByLocale(qa.text))}
                    </p>
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
