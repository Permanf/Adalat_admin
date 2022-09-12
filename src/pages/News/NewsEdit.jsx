import { useState, useEffect } from "react";
import api from "../../services/api.service";
import { useDispatch, useSelector } from "react-redux";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

import AppLayout from "../../layouts/AppLayout";
import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";
import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { putNews } from "../../redux/actions/newsAction";
import { setLoading, setRedirect } from "../../redux/reducers/mainReducer";

const NewsEdit = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const [news, setNews] = useState([]);

  useEffect(async () => {
    try {
      const result = await api.get(`news/${id}`);

      Object.keys(news).length === 0 && setNews(result.data.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id,
      title: news.title,
      text: news.text,
      published: news.published,
      published_at: news.published_at,
      main: news.main,
    };

    dispatch(putNews(payload));
    dispatch(setLoading(true));
    dispatch(setRedirect(true));
  };

  return (
    <AppLayout>
      {Object.keys(news).length > 0 && (
        <form
          onSubmit={(e) => onSubmit(e)}
          className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl"
        >
          <h1 className="text-2xl font-montserrat-bold"> Täzelik üýtgetmek </h1>
          <p className="text-red-400 my-5">
            ÜNS beriň gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly.
          </p>

          {/* <aside className="flex flex-col my-4">
                <label className="font-bold" htmlFor="logo"> Suraty </label>

                {
                    news.image &&
                    <img className="w-96 rounded-xl" src={ inputData.image_preview ? inputData.image_preview : news.image} alt={news.title.tm} />
                }

                <div className="relative border border-gray-200 bg-gray-50 rounded-md my-2 px-4 py-2 h-12">
                    <label className="absolute top-3 left-4 text-gray-400" htmlFor="file">
                        { inputData.select_image }
                    </label>
                    <input
                        onChange={e => setInputData({...inputData, image_preview: URL.createObjectURL(e.target.files[0]), select_image: e.target.files[0].name, image: e.target.files[0]})}
                        type="file"
                        className="opacity-0 absolute top-0 left-0 right-0 bottom-0 w-full"
                    />
                </div>
            </aside> */}

          <aside className="flex flex-col my-4">
            <label className="flex items-center font-bold" htmlFor="title_tm">
              <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
              Täzelik sözbaşy
              <p className="text-red-500 text-lg mx-2">*</p>
            </label>
            <input
              id="title_tm"
              type="text"
              onChange={(e) =>
                setNews({
                  ...news,
                  title: { ...news.title, tm: e.target.value },
                })
              }
              value={news.title && news.title.tm}
              placeholder="Täzelik sözbaşyny giriziň"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>

          <aside className="flex flex-col my-4">
            <label className="flex items-center font-bold" htmlFor="title_ru">
              <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
              Täzelik sözbaşy
            </label>
            <input
              id="title_ru"
              type="text"
              onChange={(e) =>
                setNews({
                  ...news,
                  title: { ...news.title, ru: e.target.value },
                })
              }
              value={news.title && news.title.ru}
              placeholder="Täzelik sözbaşyny giriziň"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>

          <aside className="flex flex-col my-4">
            <label className="flex items-center font-bold" htmlFor="title_en">
              <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
              Täzelik sözbaşy
            </label>
            <input
              id="title_en"
              type="text"
              onChange={(e) =>
                setNews({
                  ...news,
                  title: { ...news.title, en: e.target.value },
                })
              }
              value={news.title && news.title.en}
              placeholder="Täzelik sözbaşyny giriziň"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>

          <aside className="flex flex-col my-4">
            <label
              className="flex items-center font-bold mb-2"
              htmlFor="text_tm"
            >
              <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
              Täzelik ýazgysy
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
                setNews({ ...news, text: { ...news.text, tm: data } });
              }}
              data={news.text && news.text.tm}
            />
          </aside>

          <aside className="flex flex-col my-4">
            <label
              className="flex items-center font-bold mb-2"
              htmlFor="text_ru"
            >
              <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
              Täzelik ýazgysy
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
                setNews({ ...news, text: { ...news.text, ru: data } });
              }}
              data={news.text && news.text.ru}
            />
          </aside>

          <aside className="flex flex-col my-4">
            <label
              className="flex items-center font-bold mb-2"
              htmlFor="text_en"
            >
              <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
              Täzelik ýazgysy
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
                setNews({ ...news, text: { ...news.text, en: data } });
              }}
              data={news.text && news.text.en}
            />
          </aside>

          <aside className="grid grid-cols-12 gap-5 lg:gap-10 mt-7">
            <div className="col-span-12 lg:col-span-4 flex flex-col">
              <label
                className="flex items-center font-bold"
                htmlFor="published_at"
              >
                Paýlaşylan senesi (aý/gün/ýyl)
              </label>
              <input
                id="published_at"
                type="text"
                required
                pattern="[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}"
                onChange={(e) =>
                  setNews({ ...news, published_at: e.target.value })
                }
                defaultValue={news.published_at}
                placeholder="dd/mm/YYYY"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col">
              <label
                className="flex items-center font-bold"
                htmlFor="published"
              >
                Paýlaşmak
              </label>
              <select
                id="published"
                required
                onChange={(e) =>
                  setNews({ ...news, published: e.target.value })
                }
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              >
                <option selected={news.published} value="0">
                  Ýok
                </option>
                <option selected={news.published} value="1">
                  Hawa
                </option>
              </select>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col">
              <label className="flex items-center font-bold" htmlFor="main">
                Esasy sahypada
              </label>
              <select
                id="main"
                required
                onChange={(e) => setNews({ ...news, main: e.target.value })}
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              >
                <option selected={news.main} value="0">
                  Ýok
                </option>
                <option selected={news.main} value="1">
                  Hawa
                </option>
              </select>
            </div>
          </aside>

          <aside className="flex items-center justify-center mt-10">
            <NavLink
              to={`/news/${id}`}
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
  );
};

export default NewsEdit;
