import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppLayout from "../../layouts/AppLayout";

import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import api from "../../services/api.service";
import toast from "react-hot-toast";

const About = () => {
  const { t } = useTranslation();
  const [about, setAbout] = useState({ id: null, text: "", image: "" });
  const [text, setText] = useState([]);
  const [inputData, setInputData] = useState({
    select_image: "Surat saýlaň",
    image: "",
  });

  useEffect(() => {
    api.get("about").then((res) => {
      setAbout(res.data.data);
      res.data.data && res.data.data.text && setText(res.data.data.text);
    });
  }, []);

  const saveData = () => {
    const formData = new FormData();

    about && about.id && formData.append("about_id", about.id);
    formData.append("text", JSON.stringify(text));
    formData.append("image", inputData.image);

    api
      .post("about", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Üstünlikli ýatda saklanyldy");
      })
      .catch((err) => {
        toast.error("Näsazlyk ýatda saklanylmady");
      });
  };

  return (
    <AppLayout>
      <main className="bg-white py-4 px-8 rounded-lg">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold font-montserrat-bold text-gray-700 border-b pt-2 pb-3">
            {t("about")}
          </h1>
        </div>

        <aside className="flex flex-col my-4">
          <label className="font-bold" htmlFor="logo">
            Suraty
          </label>
          {about && about.image && (
            <img
              src={about.image}
              className="w-96 rounded-lg border-2 my-2"
              alt="image"
            />
          )}
          <div className="relative border border-gray-200 bg-gray-50 rounded-md my-2 px-4 py-2 h-12">
            <label
              className="absolute top-3 left-4 text-gray-400"
              htmlFor="file"
            >
              {inputData.select_image}
            </label>
            <input
              onChange={(e) => {
                setInputData({
                  ...inputData,
                  select_image: e.target.files[0].name,
                  image: e.target.files[0],
                });
              }}
              type="file"
              className="opacity-0 absolute top-0 left-0 right-0 bottom-0 w-full"
              accept="image/*"
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
                  setText({ ...text, tm: data });
                }}
                config={{ placeholder: "Türkmen dilinde" }}
                data={text && text.tm != null && text.tm}
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
                  setText({ ...text, ru: data });
                }}
                config={{ placeholder: "Rus dilinde" }}
                data={text && text.ru != null && text.ru}
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
                  setText({ ...text, en: data });
                }}
                config={{ placeholder: "Iňlis dilinde" }}
                data={text && text.en != null && text.en}
              />
            </TabPanel>
          </Tabs>
        </aside>

        <button
          onClick={() => saveData()}
          className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white duration-300 px-5 py-2 rounded-lg mt-5"
        >
          {t("save")}
        </button>
      </main>
    </AppLayout>
  );
};

export default About;
