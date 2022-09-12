import AppLayout from "../../layouts/AppLayout";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import api, { API_URL } from "../../services/api.service";
import toast from "react-hot-toast";

const AddLegalAid = () => {
  const { t } = useTranslation();
  const [text, setText] = useState([]);
  const [title, setTitle] = useState([]);
  const [link, setLink] = useState('')
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [withLink, setWithLink] = useState(false)

  useEffect(() => {
    api
      .get("legal_aids/types")
      
      .then((res) => {
        setTypes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const store = () => {
    const hasLink = link.length > 0
    const tm = hasLink ? (link + "=" + (title.tm || ' ')) : (title.tm || ' ')
    const ru = hasLink ? (link + "=" + (title.ru || ' ')) : (title.ru || ' ')
    const en = hasLink ? (link + "=" + (title.en || ' ')) : (title.en || ' ')


    const data = {
      title: { ...title, en, ru, tm },
      text,
      type: selectedType,
    };

    api
      .post("legal_aids", data)
    
      .then((res) => {
        toast.success("Üstünlikli ýatda saklanyldy");
        console.log(res)
        window.location.assign("/legalaid");
      })
      .catch((err) => {
        toast.error("Näsazlyk ýatda saklanylmady");
        console.log(err)
      });
  };

  return (
    <AppLayout>
      <main className="bg-white py-6 px-8 rounded-lg">
        <aside className="mb-5">
          <Tabs defaultTab="turkmen">
            <TabList className="flex items-center">
              <label
                className="flex items-center font-bold mr-3"
                htmlFor="text_tm"
              >
                Hukuk sözbaşy
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
              <aside className="flex flex-col">
                <label
                  className="flex items-center font-bold"
                  htmlFor="title_tm"
                ></label>
                <input
                  id="title_tm"
                  type="text"
                  required
                  onChange={(e) => setTitle({ ...title, tm: e.target.value })}
                  placeholder="Hukuk sözbaşy türkmen dilinde"
                  className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                />
              </aside>
            </TabPanel>

            <TabPanel tabId="russian">
              <aside className="flex flex-col">
                <label
                  className="flex items-center font-bold"
                  htmlFor="title_ru"
                ></label>
                <input
                  id="title_ru"
                  type="text"
                  required
                  onChange={(e) => setTitle({ ...title, ru: e.target.value })}
                  placeholder="Hukuk sözbaşy rus dilinde"
                  className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                />
              </aside>
            </TabPanel>

            <TabPanel tabId="english">
              <aside className="flex flex-col">
                <label
                  className="flex items-center font-bold"
                  htmlFor="title_en"
                ></label>
                <input
                  id="title_en"
                  type="text"
                  required
                  onChange={(e) => setTitle({ ...title, en: e.target.value })}
                  placeholder="Hukuk sözbaşy iňlis dilinde"
                  className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                />
              </aside>
            </TabPanel>
          </Tabs>
        </aside>
        <aside className="mb-5">
          <aside className="flex flex-row items-center">
            <input
              id="title_link_checkbox"
              type="checkbox"
              onChange={(e) => { setWithLink(e.target.checked) }}

            />
            <label
              className="flex items-center font-bold ml-2"
              htmlFor="title_link"
            >web saýt goşmak</label>

          </aside>
        </aside>
        {/* link */}
        {withLink && <aside className="mb-5">
          <aside className="flex flex-col">
            <label
              className="flex items-center font-bold"
              htmlFor="title_link"
            ></label>
            <input
              id="title_link"
              type="text"
              required={withLink}
              onChange={(e) => { setLink(e.target.value) }}
              placeholder="web saýty"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />

          </aside>
        </aside>}
        <aside className="mb-5">
          <Tabs defaultTab="turkmen">
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
                config={{
                  ckfinder: {
                    uploadUrl: `${API_URL}/legal_aid/image_upload`,
                    withCredentials: true,
                  },
                  placeholder: "Türkmen dilinde",
                }}
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
                data={text && text.tm != null && text.tm}
              />
            </TabPanel>

            <TabPanel tabId="russian">
              <CKEditor
                config={{
                  ckfinder: {
                    uploadUrl: `${API_URL}/legal_aid/image_upload`,
                    withCredentials: true,
                  },
                  placeholder: "Rus dilinde",
                }}
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
                data={text && text.ru != null && text.ru}
              />
            </TabPanel>

            <TabPanel tabId="english">
              <CKEditor
                config={{
                  ckfinder: {
                    uploadUrl: `${API_URL}/legal_aid/image_upload`,
                    withCredentials: true,
                  },
                  placeholder: "Iňlis dilinde",
                }}
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
                data={text && text.en != null && text.en}
              />
            </TabPanel>
          </Tabs>
        </aside>

        <aside className="col-span-12 lg:col-span-4 flex flex-col">
          <label className="flex items-center font-bold" htmlFor="selectedType">
            Bölümi
          </label>
          <select
            id="selectedType"
            required
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          >
            <option value="none" selected disabled>Bölümi saýlaň</option>
            {types &&
              types.length > 0 &&
              types.map((type, index) => {
                return (
                  <option key={index} value={type.type}>
                    {type.title}
                  </option>
                );
              })}
          </select>
        </aside>
        <button
          onClick={() => store()}
          className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white duration-300 px-5 py-2 rounded-lg mt-5"
        >
          {t("save")}
        </button>
        <NavLink
          to="/legalaid"
          className="bg-gray-50 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2.5 mx-5"
        >
          {t("cancel")}
        </NavLink>
      </main>
    </AppLayout>
  );
};

export default AddLegalAid;
