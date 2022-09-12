import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";

import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";

import { setLoading, setRedirect } from "../../redux/reducers/mainReducer";
import AppLayout from "../../layouts/AppLayout";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { getLawFile, putLaw } from "../../redux/actions/lawsAction";
import getByLocale from "../../helpers/getByLocale";
import { PuffLoader } from 'react-spinners';

const LawEditText = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const [editLaw, setEditLaw] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState("turkmen");
  const law_file = useSelector((state) => state.laws.law_file);
  const redirect = useSelector((state) => state.main.redirect);

  const onSave = () => {
    const payload = {
      id,
      text: {
        tm: editLaw.text.tm,
        ru: editLaw.text.ru,
        en: editLaw.text.en,
      },
    };

    dispatch(putLaw(payload));
    dispatch(setLoading(true));
    dispatch(setRedirect(true));
  };

  useEffect(() => {
    dispatch(getLawFile(id));
  }, [dispatch]);

  useEffect(() => {
    setEditLaw(law_file);
  }, [law_file]);

  // console.log(law_file);
  // console.log(law_file);
  console.log(editLaw?.id)


  return (
    <>
      {redirect && <Redirect to={`/law/${editLaw.laws_id}`} />}

      <AppLayout>
        {
          editLaw?.id?
          (
          <section className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl relative">
            <h1 className="text-xl text-green-600 font-montserrat-bold">
              {law_file && law_file?.title && getByLocale(law_file?.title)}
            </h1>
            <small className="bg-green-600 text-white px-2 py-1 text-xs rounded absolute top-3 right-3">
              {t("edit_text")}
            </small>

            <aside className="mt-6">
              <Tabs
                defaultTab="turkmen"
                onChange={(tabId) => {
                  setSelectedTabId(tabId);
                }}
              >
                <TabList className="grid grid-cols-12 gap-5 mb-3">
                  <Tab
                    focusable
                    tabFor="turkmen"
                    className={`flex col-span-4 p-3 border ${
                      selectedTabId === "turkmen" ? "bg-gray-100" : ""
                    }`}
                  >
                    <img
                      data-tip="Türkmen dilinde"
                      className="w-8 mr-3"
                      src={TM_FLAG}
                      alt="TM"
                    />
                    <strong> Türkmen </strong>
                  </Tab>
                  <Tab
                    focusable
                    tabFor="russian"
                    className={`flex col-span-4 p-3 border ${
                      selectedTabId === "russian" ? "bg-gray-100" : ""
                    }`}
                  >
                    <img
                      data-tip="Rus dilinde"
                      className="w-8 mr-3"
                      src={RU_FLAG}
                      alt="RU"
                    />
                    <strong> Русский </strong>
                  </Tab>
                  <Tab
                    focusable
                    tabFor="english"
                    className={`flex col-span-4 p-3 border ${
                      selectedTabId === "english" ? "bg-gray-100" : ""
                    }`}
                  >
                    <img
                      data-tip="Iňlis dilinde"
                      className="w-8 mr-3"
                      src={EN_FLAG}
                      alt="EN"
                    />
                    <strong> English </strong>
                  </Tab>
                </TabList>

                <TabPanel tabId="turkmen">
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
                      setEditLaw({
                        ...editLaw,
                        text: { ...editLaw.text, tm: data },
                      });
                    }}
                    data={editLaw.text && editLaw.text.tm}
                  />
                </TabPanel>

                <TabPanel tabId="russian">
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
                      setEditLaw({
                        ...editLaw,
                        text: { ...editLaw.text, ru: data },
                      });
                    }}
                    data={editLaw.text && editLaw.text.ru}
                  />
                </TabPanel>

                <TabPanel tabId="english">
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
                      setEditLaw({
                        ...editLaw,
                        text: { ...editLaw.text, en: data },
                      });
                    }}
                    data={editLaw.text && editLaw.text.en}
                  />
                </TabPanel>
              </Tabs>
            </aside>

            <aside className="flex items-center justify-center mt-10">
              <button
                onClick={() => history.goBack()}
                className="bg-gray-50 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2 mx-2"
              >
                {t("cancel")}
              </button>

              <button
                onClick={() => onSave()}
                className="bg-white text-green-700 border border-green-700 hover:bg-green-700 hover:text-white duration-300 font-bold rounded-lg px-5 py-2 mx-2"
              >
                {t("save")}
              </button>
            </aside>
          </section>
        )
      :
      // <p>loading...</p>
      <div className="w-full h-screen flex justify-center items-center">
      <PuffLoader />
      </div>
      }
      </AppLayout>
    </>
  );
};

export default LawEditText;
