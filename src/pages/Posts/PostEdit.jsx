import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../../layouts/AppLayout";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { updatePost } from "../../redux/actions/postAction";
import { setLoading } from "../../redux/reducers/mainReducer";
import { useTranslation } from "react-i18next";
import api, { API_URL } from "../../services/api.service";

const PostEdit = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const redirect = useSelector((state) => state.main.redirect);
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);
  const [type, setType] = useState("post");
  const [publishedAt, setPublishedAt] = useState(null);

  useEffect(() => {
    api
      .get(`post/${id}`)
      .then((res) => {
        setPost(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(updatePost(post));
    dispatch(setLoading(true));
  };

  return (
    <AppLayout>
      {redirect && <Redirect to="/posts" />}

      {post && (
        <form
          onSubmit={(event) => onSubmit(event)}
          className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl"
        >
          <h1 className="text-2xl font-montserrat-bold"> Makala üýtgetmek </h1>
          <p className="text-red-400 my-5">
            ÜNS beriň gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly.
          </p>

          {/* <aside className="flex flex-col my-4">
                <label className="font-bold" htmlFor="logo"> Suraty </label>

                <img className="w-96 my-2 rounded-xl" src={ inputData.image_preview ? inputData.image_preview : post.image} alt={post.post.tm} />

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
              Makala sözbaşy
              <p className="text-red-500 text-lg mx-2">*</p>
            </label>
            <input
              id="title_tm"
              type="text"
              onChange={(e) =>
                setPost({
                  ...post,
                  title: { ...post.title, tm: e.target.value },
                })
              }
              placeholder="Makala sözbaşyny giriziň"
              value={post && post.title && post.title.tm}
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>

          <aside className="flex flex-col my-4">
            <label className="flex items-center font-bold" htmlFor="title_ru">
              <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
              Makala sözbaşy
            </label>
            <input
              id="title_ru"
              type="text"
              onChange={(e) =>
                setPost({
                  ...post,
                  title: { ...post.title, ru: e.target.value },
                })
              }
              placeholder="Makala sözbaşyny giriziň"
              value={post && post.title && post.title.ru}
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>

          <aside className="flex flex-col my-4">
            <label className="flex items-center font-bold" htmlFor="title_en">
              <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
              Makala sözbaşy
            </label>
            <input
              id="title_en"
              type="text"
              onChange={(e) =>
                setPost({
                  ...post,
                  title: { ...post.title, en: e.target.value },
                })
              }
              placeholder="Makala sözbaşyny giriziň"
              value={post && post.title && post.title.en}
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>

          {post.text && (
            <aside className="flex flex-col my-4">
              <label
                className="flex items-center font-bold mb-2"
                htmlFor="text_tm"
              >
                <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                Makala ýazgysy
                <p className="text-red-500 text-lg mx-2">*</p>
              </label>

              <CKEditor
                config={{
                  ckfinder: {
                    uploadUrl: `${API_URL}/post/image_upload`,
                    withCredentials: true,
                  },
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
                  setPost({ ...post, text: { ...post.text, tm: data } });
                }}
                data={post && post.text && post.text.tm}
              />
            </aside>
          )}

          {post.text && (
            <aside className="flex flex-col my-4">
              <label
                className="flex items-center font-bold mb-2"
                htmlFor="text_ru"
              >
                <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                Makala ýazgysy
              </label>

              <CKEditor
                config={{
                  ckfinder: {
                    uploadUrl: `${API_URL}/post/image_upload`,
                    withCredentials: true,
                  },
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
                  setPost({ ...post, text: { ...post.text, ru: data } });
                }}
                data={post && post.text && post.text.ru}
              />
            </aside>
          )}

          {post.text && (
            <aside className="flex flex-col my-4">
              <label
                className="flex items-center font-bold mb-2"
                htmlFor="text_en"
              >
                <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                Makala ýazgysy
              </label>

              <CKEditor
                config={{
                  ckfinder: {
                    uploadUrl: `${API_URL}/post/image_upload`,
                    withCredentials: true,
                  },
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
                  setPost({ ...post, text: { ...post.text, en: data } });
                }}
                data={post && post.text && post.text.en}
              />
            </aside>
          )}

          <aside className="grid grid-cols-12 gap-5 lg:gap-10 mt-7">
            <div className="col-span-12 lg:col-span-6 flex flex-col">
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
                  setPost({ ...post, published_at: e.target.value })
                }
                placeholder="dd/mm/YYYY"
                value={post && post.published_at}
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              />
            </div>

            <div className="col-span-12 lg:col-span-6 flex flex-col">
              <label className="flex items-center font-bold" htmlFor="type">
                Makala bölümi
              </label>

              <select
                onChange={(e) => setPost({ ...post, type: e.target.value })}
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              >
                <option selected={post && post.type === "post"} value="post">
                  Makalalar
                </option>
                <option selected={post && post.type === "event"} value="event">
                  Çäreler
                </option>
              </select>
            </div>
          </aside>

          <aside className="flex items-center justify-center mt-10">
            <NavLink
              to={`/post/${id}`}
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

export default PostEdit;
