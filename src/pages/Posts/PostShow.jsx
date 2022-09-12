import AppLayout from "../../layouts/AppLayout";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import SmallModal from "../../components/Modal/SmallModal";
import {
  IoPencilOutline,
  IoTimeOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import getByLocale from "../../helpers/getByLocale";
import { getPost, removePost } from "../../redux/actions/postAction";
import PostDelete from "./PostDelete";
import { useTranslation } from "react-i18next";

const PostShow = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);
  const redirect = useSelector((state) => state.main.redirect);
  const [open, setOpen] = useState(false);

  const modalClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(removePost(id));
  };

  useEffect(() => {
    dispatch(getPost(id));
  }, []);

  return (
    <>
      <SmallModal isOpen={open} close={modalClose}>
        <PostDelete delete={handleDelete} close={modalClose} />
      </SmallModal>
      <AppLayout>
        {redirect && <Redirect to="/posts" />}

        {post && post.title && (
          <section className="bg-white shadow-gray rounded-lg mb-10">
            <main className="p-4">
              {post.image && (
                <img
                  className="w-full rounded-lg mb-5"
                  src={post.image}
                  alt={post.title && getByLocale(post.title)}
                />
              )}
              <small className="flex items-center text-base text-gray-600 mb-2">
                <IoTimeOutline className="mr-2" size={22} /> {post.date}
              </small>

              <aside className="flex items-center">
                <NavLink
                  to={`/post/${id}/edit`}
                  className="flex bg-white hover:bg-blue-600 border border-blue-600 text-blue-600 hover:text-white px-3 py-1 text-sm duration-300 rounded-md my-2"
                >
                  <IoPencilOutline size={22} className="mr-2" /> Üýtget
                </NavLink>

                <button
                  onClick={() => setOpen(true)}
                  className="flex bg-white hover:bg-red-600 border border-red-600 text-red-600 hover:text-white px-3 py-1 text-sm duration-300 rounded-md my-2 ml-4"
                >
                  <IoTrashOutline size={22} className="mr-2" /> Poz
                </button>
              </aside>

              <article className="my-3">
                <h1 className="text-lg lg:text-2xl font-bold font-montserrat-bold text-gray-700 mb-3">
                  {post.title && getByLocale(post.title)}
                </h1>
                <p className="text-gray-600">
                  {post.text && ReactHtmlParser(getByLocale(post.text))}
                </p>
              </article>
            </main>
          </section>
        )}
      </AppLayout>
    </>
  );
};

export default PostShow;
