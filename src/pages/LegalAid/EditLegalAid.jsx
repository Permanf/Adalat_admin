import AppLayout from "../../layouts/AppLayout";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import api from "../../services/api.service";
import toast from "react-hot-toast";
import { NavLink, useParams } from "react-router-dom";
import { isExistLinkOnTitle } from "../../hook/isExistLinkOnTitle";

const EditLegalAid = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [legalAid, setLegalAid] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [withLink, setWithLink] = useState(false)
  const [link, setLink] = useState('')

  useEffect(async () => {
    await api
      .get(`/legal_aids/${id}`)
      .then((res) => {
        const currentLink = isExistLinkOnTitle(res.data.data.title?.tm) ? res.data.data.title?.tm.split('=')[0] : ''
        setLegalAid(res.data.data);
        setLink(currentLink)
        setWithLink(isExistLinkOnTitle(res.data.data.title?.tm))
        setSelectedType(res.data.data?.type)
      })
      .catch((err) => console.log(err));

    await api
      .get("legal_aids/types")
      .then((res) => {
        setTypes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const update = () => {
    // console.log(legalAid)
    // debugger
    const hasLink = link.length > 0
    const tm = hasLink ? (link + "=" + (legalAid.title.tm || ' ')) : (legalAid.title.tm || ' ')
    const ru = hasLink ? (link + "=" + (legalAid.title.ru || ' ')) : (legalAid.title.ru || ' ')
    const en = hasLink ? (link + "=" + (legalAid.title.en || ' ')) : (legalAid.title.en || ' ')
    const data = {
      title: { ...legalAid.title, ru, tm, en },
      text: legalAid.text,
      type: selectedType,
    };

    api
      .put(`legal_aids/${id}`, data)
      .then((res) => {
        toast.success("Üstünlikli ýatda saklanyldy");
        window.location.assign("/legalaid");
      })
      .catch((err) => {
        toast.error("Näsazlyk ýatda saklanylmady");
      });
  };
  const setTitle = (title) => {
    const text = title.split('=')[1]
    return text
  }
  // console.log(legalAid)

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
                  onChange={(e) =>
                    setLegalAid({
                      ...legalAid,
                      title: { ...legalAid.title, tm: e.target.value },
                    })
                  }
                  value={(isExistLinkOnTitle(legalAid?.title?.tm)) ? setTitle((legalAid?.title?.tm)) : (legalAid?.title?.tm)}
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
                  onChange={(e) =>
                    setLegalAid({
                      ...legalAid,
                      title: { ...legalAid.title, ru: e.target.value },
                    })
                  }
                  value={(isExistLinkOnTitle(legalAid?.title?.ru)) ? setTitle((legalAid?.title?.ru)) : (legalAid?.title?.ru)}

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
                  onChange={(e) =>
                    setLegalAid({
                      ...legalAid,
                      title: { ...legalAid.title, en: e.target.value },
                    })
                  }
                  value={(isExistLinkOnTitle(legalAid?.title?.en)) ? setTitle((legalAid?.title?.en)) : (legalAid?.title?.en)}
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
              checked={withLink}
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
              value={link}
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
                  if (legalAid.title) {
                    setLegalAid({
                      ...legalAid,
                      text: { ...legalAid.text, tm: data },
                    });
                  }
                }}
                config={{ placeholder: "Türkmen dilinde" }}
                data={
                  legalAid &&
                  legalAid.text &&
                  legalAid.text.tm != null &&
                  legalAid.text.tm
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
                  if (legalAid.title) {
                    setLegalAid({
                      ...legalAid,
                      text: { ...legalAid.text, ru: data },
                    });
                  }
                }}
                config={{ placeholder: "Rus dilinde" }}
                data={
                  legalAid &&
                  legalAid.text &&
                  legalAid.text.ru != null &&
                  legalAid.text.ru
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
                  if (legalAid.title) {
                    setLegalAid({
                      ...legalAid,
                      text: { ...legalAid.text, en: data },
                    });
                  }
                }}
                config={{ placeholder: "Iňlis dilinde" }}
                data={
                  legalAid &&
                  legalAid.text &&
                  legalAid.text.en != null &&
                  legalAid.text.en
                }
              />
            </TabPanel>
          </Tabs>
        </aside>

        {/* selectedType not working */}

        <aside className="col-span-12 lg:col-span-4 flex flex-col">
          <label className="flex items-center font-bold" htmlFor="selectedType">
            Bölümi
          </label>
          <select
            id="selectedType"
            required
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          >
            <option value="none" disabled>Bölümi saýlaň</option>
            {types &&
              types.length > 0 &&
              types.map((type, index) => {
                return (
                  <option
                    key={index}
                    value={type.type}
                    defaultChecked={
                      legalAid && (type.type === legalAid.type)
                    }
                  >
                    {type.title}
                  </option>
                );
              })}
          </select>
        </aside>
        <button
          onClick={() => update()}
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

export default EditLegalAid;
