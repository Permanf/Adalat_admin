import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { setLoading, setRedirect } from "../../redux/reducers/mainReducer";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { useTranslation } from "react-i18next";
import AppLayout from "../../layouts/AppLayout";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";

import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";
import { getLawyer, putLawyer } from "../../redux/actions/lawyerAction";

const LawyerEdit = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const [editLawyer, setEditLawyer] = useState([]);
  const lawyer = useSelector((state) => state.lawyer.lawyer);
  const redirect = useSelector((state) => state.main.redirect);

  useEffect(() => {
    dispatch(getLawyer(id));
  }, []);

  useEffect(() => {
    setEditLawyer(lawyer);
  }, [lawyer]);

  const saveLawyer = () => {
    const data = {
      id,
      data: editLawyer,
    };

    dispatch(putLawyer(data));
    dispatch(setLoading(true));
    dispatch(setRedirect(true));
  };

  return (
    <>
      {redirect && <Redirect to="/lawyers" />}

      <AppLayout>
        <main className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl">
          <h1 className="text-2xl font-montserrat-bold mb-3">
            Hukukçy maglumatlary üýtgetmek
          </h1>
          <p className="text-red-400 mt-2 mb-5">
            ÜNS BERIŇ. Gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly
          </p>

          <aside className="grid grid-cols-12 gap-5">
            <div className="col-span-12 xl:col-span-4 flex flex-col">
              <label className="flex items-center font-bold" htmlFor="title_tm">
                <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                Hukukçy ady
                <p className="text-red-500 text-lg mx-2">*</p>
              </label>
              <input
                id="title_tm"
                type="text"
                required
                onChange={(e) =>
                  setEditLawyer({
                    ...editLawyer,
                    title: { ...editLawyer.title, tm: e.target.value },
                  })
                }
                value={editLawyer.title && editLawyer.title.tm}
                placeholder="Hukukçy adyny giriziň"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </div>

            <div className="col-span-12 xl:col-span-4 flex flex-col">
              <label className="flex items-center font-bold" htmlFor="title_ru">
                <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                Hukukçy ady
              </label>
              <input
                id="title_ru"
                type="text"
                onChange={(e) =>
                  setEditLawyer({
                    ...editLawyer,
                    title: { ...editLawyer.title, ru: e.target.value },
                  })
                }
                value={editLawyer.title && editLawyer.title.ru}
                placeholder="Hukukçy adyny giriziň"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </div>

            <div className="col-span-12 xl:col-span-4 flex flex-col">
              <label className="flex items-center font-bold" htmlFor="title_en">
                <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                Hukukçy ady
              </label>
              <input
                id="title_en"
                type="text"
                onChange={(e) =>
                  setEditLawyer({
                    ...editLawyer,
                    title: { ...editLawyer.title, en: e.target.value },
                  })
                }
                value={editLawyer.title && editLawyer.title.en}
                placeholder="Hukukçy adyny giriziň"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </div>
          </aside>

          <aside className="grid grid-cols-12 gap-5 my-3">
            <div className="col-span-12 xl:col-span-6 flex flex-col">
              <label className="flex items-center font-bold" htmlFor="phone">
                Telefon belgi
                <p className="text-red-500 text-lg mx-2">*</p>
              </label>
              <input
                id="phone"
                type="text"
                required
                onChange={(e) =>
                  setEditLawyer({ ...editLawyer, phone: e.target.value })
                }
                value={editLawyer.phone && editLawyer.phone}
                placeholder="Hukukçy adyny giriziň"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </div>

            <div className="col-span-12 xl:col-span-6 flex flex-col">
              <label className="flex items-center font-bold" htmlFor="email">
                Email salgy
                <p className="text-red-500 text-lg mx-2">*</p>
              </label>
              <input
                id="email"
                type="text"
                required
                onChange={(e) =>
                  setEditLawyer({ ...editLawyer, email: e.target.value })
                }
                value={editLawyer.email && editLawyer.email}
                placeholder="Hukukçy adyny giriziň"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </div>
          </aside>

          <aside className="grid grid-cols-12 gap-5 my-3">
            <div className="col-span-12 xl:col-span-6 flex flex-col">
              <label
                className="flex items-center font-bold mb-1"
                htmlFor="website"
              >
                Web saýt
              </label>
              <input
                id="website"
                type="text"
                onChange={(e) =>
                  setEditLawyer({ ...editLawyer, website: e.target.value })
                }
                value={editLawyer.website && editLawyer.website}
                placeholder="Hukukçy adyny giriziň"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </div>

            <div className="col-span-12 xl:col-span-6 flex flex-col">
              <label
                className="flex items-center font-bold"
                htmlFor="license_number"
              >
                Ygtyýarnama belgi
                <p className="text-red-500 text-lg mx-2">*</p>
              </label>
              <input
                id="license_number"
                type="text"
                required
                onChange={(e) =>
                  setEditLawyer({
                    ...editLawyer,
                    license_number: e.target.value,
                  })
                }
                value={editLawyer.license_number && editLawyer.license_number}
                placeholder="Hukukçy adyny giriziň"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </div>
          </aside>

          <aside>
            <Tabs
              defaultTab="turkmen"
              onChange={(tabId) => {
                console.log(tabId);
              }}
            >
              <TabList className="flex items-center mb-3">
                <label
                  className="flex items-center font-bold mr-3"
                  htmlFor="text_tm"
                >
                  Maglumat
                </label>
                <Tab tabFor="turkmen">
                  <img
                    data-tip="Türkmen dilinde"
                    className="w-8 mr-3"
                    src={TM_FLAG}
                    alt="TM"
                  />
                </Tab>
                <Tab tabFor="russian">
                  <img
                    data-tip="Rus dilinde"
                    className="w-8 mr-3"
                    src={RU_FLAG}
                    alt="RU"
                  />
                </Tab>
                <Tab tabFor="english">
                  <img
                    data-tip="Iňlis dilinde"
                    className="w-8 mr-3"
                    src={EN_FLAG}
                    alt="EN"
                  />
                </Tab>
              </TabList>
              <TabPanel tabId="turkmen">
                <CKEditor
                  editor={DecoupledEditor}
                  // config={ { ...CkeditorTools } }
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
                    setEditLawyer({
                      ...editLawyer,
                      description: { ...editLawyer.description, tm: data },
                    });
                  }}
                  config={{ placeholder: "Türkmen dilinde" }}
                  data={
                    editLawyer.description &&
                    editLawyer.description.tm != null &&
                    editLawyer.description.tm
                  }
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
                    setEditLawyer({
                      ...editLawyer,
                      description: { ...editLawyer.description, ru: data },
                    });
                  }}
                  config={{ placeholder: "Rus dilinde" }}
                  data={
                    editLawyer.description &&
                    editLawyer.description.ru != null &&
                    editLawyer.description.ru
                  }
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
                    setEditLawyer({
                      ...editLawyer,
                      description: { ...editLawyer.description, en: data },
                    });
                  }}
                  config={{ placeholder: "Iňlis dilinde" }}
                  data={
                    editLawyer.description &&
                    editLawyer.description.en != null &&
                    editLawyer.description.en
                  }
                />
              </TabPanel>
            </Tabs>
          </aside>

          <aside className="flex items-center justify-center mt-7">
            <NavLink
              to="/lawyers"
              className="bg-gray-50 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2 mx-2"
            >
              {t("cancel")}
            </NavLink>

            <button
              type="submit"
              onClick={() => saveLawyer()}
              className="bg-white text-green-700 border border-green-700 hover:bg-green-700 hover:text-white duration-300 font-bold rounded-lg px-5 py-2 mx-2"
            >
              {t("save")}
            </button>
          </aside>
        </main>
      </AppLayout>
    </>
  );
};

export default LawyerEdit;
