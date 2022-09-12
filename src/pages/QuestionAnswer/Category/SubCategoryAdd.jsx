import { useTranslation } from "react-i18next";
import { useState } from "react";
import TM_FLAG from "../../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../../assets/images/locales/en.jpg";
import { useDispatch } from "react-redux";
import { storeCategoryQuestionAnswers } from "../../../redux/actions/questionAnswerAction";
import AppLayout from "../../../layouts/AppLayout";
import { NavLink, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const SubCategoryAdd = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [text, setText] = useState();

  const saveCategory = (e) => {
    e.preventDefault();

    const data = {
      id,
      title,
      text,
    };

    dispatch(storeCategoryQuestionAnswers(data));

    setTimeout(() => {
      window.location.assign(`/question_answer/subcategory/${id}`);
    }, 1500);
  };

  return (
    <AppLayout>
      <form
        onSubmit={(e) => saveCategory(e)}
        className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl"
      >
        <h1 className="text-xl font-montserrat-bold pb-4">
          Sorag jogap goşmak
        </h1>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="title_tm">
            <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
            Sorag/jogap
            <p className="text-red-500 text-lg mx-2">*</p>
          </label>
          <input
            id="title_tm"
            type="text"
            required
            onChange={(e) => setTitle({ ...title, tm: e.target.value })}
            placeholder="Sorag/jogap sözbaşyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="title_ru">
            <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
            Sorag/jogap
          </label>
          <input
            id="title_ru"
            type="text"
            onChange={(e) => setTitle({ ...title, ru: e.target.value })}
            placeholder="Sorag/jogap sözbaşyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold" htmlFor="title_en">
            <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
            Sorag/jogap
          </label>
          <input
            id="title_en"
            type="text"
            onChange={(e) => setTitle({ ...title, en: e.target.value })}
            placeholder="Sorag/jogap sözbaşyny giriziň"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold mb-2" htmlFor="text_tm">
            <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
            Sorag/Jogap ýazgysy
            <p className="text-red-500 text-lg mx-2">*</p>
          </label>

          <CKEditor
            editor={DecoupledEditor}
            onReady={(editor) => {
              editor.ui
                .getEditableElement()
                .parentElement.insertBefore(
                  editor.ui.view.toolbar.element,
                  editor.ui.getEditableElement()
                );
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setText({ ...text, tm: data });
            }}
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold mb-2" htmlFor="text_ru">
            <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
            Sorag/Jogap ýazgysy
          </label>

          <CKEditor
            editor={DecoupledEditor}
            onReady={(editor) => {
              editor.ui
                .getEditableElement()
                .parentElement.insertBefore(
                  editor.ui.view.toolbar.element,
                  editor.ui.getEditableElement()
                );
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setText({ ...text, ru: data });
            }}
          />
        </aside>

        <aside className="flex flex-col my-4">
          <label className="flex items-center font-bold mb-2" htmlFor="text_en">
            <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
            Sorag/Jogap ýazgysy
          </label>

          <CKEditor
            editor={DecoupledEditor}
            onReady={(editor) => {
              editor.ui
                .getEditableElement()
                .parentElement.insertBefore(
                  editor.ui.view.toolbar.element,
                  editor.ui.getEditableElement()
                );
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setText({ ...text, en: data });
            }}
          />
        </aside>

        <div className="flex items-center justify-between">
          <button className="bg-green-500 hover:bg-green-700 duration-300 text-white px-5 py-2.5 rounded-lg">
            {t("save")}
          </button>

          <NavLink
            to="/question_answer"
            className="bg-gray-100 hover:bg-gray-200 duration-300 text-gray-600 px-5 py-2.5 rounded-lg"
          >
            {t("cancel")}
          </NavLink>
        </div>
      </form>
    </AppLayout>
  );
};
export default SubCategoryAdd;
