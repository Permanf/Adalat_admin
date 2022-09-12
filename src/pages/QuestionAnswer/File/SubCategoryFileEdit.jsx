import { useState, useEffect } from "react";
import api from "../../../services/api.service";
import { useDispatch, useSelector } from "react-redux";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

import AppLayout from "../../../layouts/AppLayout";
import TM_FLAG from "../../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../../assets/images/locales/en.jpg";
import { NavLink, useParams ,Redirect} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setLoading, setRedirect } from "../../../redux/reducers/mainReducer";
import { putQuestionAnswer } from "../../../redux/actions/questionAnswerAction";

const SubCategoryFileEdit = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const [editQuestion, setEditQuestion] = useState([]);
  const redirect = useSelector((state) => state.main.redirect);

  useEffect(async () => {
    try {
      const result = await  api.post(`/question_answer/show/${id}`);
     
      Object.keys(editQuestion).length === 0 && setEditQuestion(result.data.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id,
      title: editQuestion.title,
      text: editQuestion.text,
     
    };

    dispatch(putQuestionAnswer(payload));
    dispatch(setLoading(true));
    dispatch(setRedirect(true));
  };

  return (
    <>
      {redirect && <Redirect to={`/question_answer/subcategory/file/${id}`} />}
   
      <AppLayout>
        {Object.keys(editQuestion).length > 0 && (
          <form
            onSubmit={(e) => onSubmit(e)}
            className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl"
          >
            <h1 className="text-2xl font-montserrat-bold"> Sorag-jogap üýtgetmek </h1>
            <p className="text-red-400 my-5">
              ÜNS beriň gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly.
            </p>

            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="title_tm">
                <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                Soragyň ady
                <p className="text-red-500 text-lg mx-2">*</p>
              </label>
              <input
                id="title_tm"
                type="text"
                onChange={(e) =>
                  setEditQuestion({
                    ...editQuestion,
                    title: { ...editQuestion.title, tm: e.target.value },
                  })
                }
                value={editQuestion.title && editQuestion.title.tm}
                placeholder="Sorag-jogap sözbaşyny giriziň"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="title_ru">
                <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                Soragyň ady
              </label>
              <input
                id="title_ru"
                type="text"
                onChange={(e) =>
                  setEditQuestion({
                    ...editQuestion,
                    title: { ...editQuestion.title, ru: e.target.value },
                  })
                }
                value={editQuestion.title && editQuestion.title.ru}
                placeholder="Sorag-jogap sözbaşyny giriziň"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label className="flex items-center font-bold" htmlFor="title_en">
                <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                Soragyň ady
              </label>
              <input
                id="title_en"
                type="text"
                onChange={(e) =>
                  setEditQuestion({
                    ...editQuestion,
                    title: { ...editQuestion.title, en: e.target.value },
                  })
                }
                value={editQuestion.title && editQuestion.title.en}
                placeholder="Sorag-jogap sözbaşyny giriziň"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label
                className="flex items-center font-bold mb-2"
                htmlFor="text_tm"
              >
                <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                Soragyň ýazgysy
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
                  setEditQuestion({ ...editQuestion, text: { ...editQuestion.text, tm: data } });
                }}
                data={editQuestion.text && editQuestion.text.tm}
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label
                className="flex items-center font-bold mb-2"
                htmlFor="text_ru"
              >
                <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                Soragyň ýazgysy
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
                  setEditQuestion({ ...editQuestion, text: { ...editQuestion.text, ru: data } });
                }}
                data={editQuestion.text && editQuestion.text.ru}
              />
            </aside>

            <aside className="flex flex-col my-4">
              <label
                className="flex items-center font-bold mb-2"
                htmlFor="text_en"
              >
                <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                Soragyň ýazgysy
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
                  setEditQuestion({ ...editQuestion, text: { ...editQuestion.text, en: data } });
                }}
                data={editQuestion.text && editQuestion.text.en}
              />
            </aside>

          

            <aside className="flex items-center justify-center mt-10">
              <NavLink
                to={`/question_answer/subcategory/file/${id}`}
                className="bg-gray-50 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2 mx-2"
              >
                {t("cancel")}
              </NavLink>

              <button
                type="submit"
                className="bg-white text-green-700 border border-green-700 hover:bg-green-700 hover:text-white duration-300 font-bold rounded-lg px-5 py-2 mx-2"
              >
                {t("save")}
              </button>
            </aside>
          </form>
        )}
      </AppLayout>
     </>
  );
};

export default SubCategoryFileEdit;
