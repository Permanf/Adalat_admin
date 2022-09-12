import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { IoAddCircleOutline, IoArrowUndoOutline } from "react-icons/io5";
import AppLayout from "../../layouts/AppLayout";
import api from "../../services/api.service";
import { useHistory } from "react-router-dom";

import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";
import EmptyList from "../../components/Empty/EmptyList";
import { NavLink } from "react-router-dom";

const ServiceCategory = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    api
      .get("services/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => {
        toast.error("Maglumatlar ýüklenmedi", {
          duration: 2000,
        });
      });
  }, []);

  const categorySave = () => {
    title &&
      title.tm &&
      title.tm.length > 0 &&
      title &&
      title.ru &&
      title.ru.length > 0 &&
      api
        .post("services/categories", { title })
        .then((res) => {
          setCategories([...categories, res.data.data]);
        })
        .catch((err) => toast.error(t("error_not_added"), { duration: 2000 }));
  };

  return (
    <AppLayout>
      <section>
        <aside className="bg-white p-3 rounded-lg flex items-center">
          <button
            onClick={() => history.goBack()}
            className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full mr-3"
          >
            <IoArrowUndoOutline size={24} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
              {t("service_category")}
            </h1>
            <small className="flex font-montserrat-medium text-sm text-gray-500">
              <p>{t("total")}:</p>
              <p className="ml-2">{categories.length}</p>
            </small>
          </div>
        </aside>

        <main className="grid grid-cols-12 gap-5 my-5">
          <section className="xl:order-1 order-2 col-span-12 xl:col-span-9 bg-white rounded-lg p-5">
            {categories.length === 0 && <EmptyList message="Sanaw boş" />}
            {categories.length > 0 &&
              categories.map((category, index) => {
                return (
                  <aside className="mb-2">
                    <NavLink
                      to={`/service_categories/${category.id}`}
                      key={index}
                      className="flex flex-col border border-gray-100 text-gray-800 px-5 py-2 cursor-pointer rounded-md mb-2"
                    >
                      <strong>{category.title && category.title.tm}</strong>
                      <small>
                        {t("total")}: {category.items && category.items.length}
                      </small>
                    </NavLink>
                  </aside>
                );
              })}
          </section>

          <section className="xl:order-2 order-1 col-span-12 xl:col-span-3 bg-white rounded-lg p-5 h-85">
            <div className="flex flex-col">
              <label className="flex mb-2" htmlFor="title_tm">
                <img
                  data-tip="Türkmen dilinde"
                  className="w-8 mr-3"
                  src={TM_FLAG}
                  alt="TM"
                />
                <p> Bölüm ady </p>
              </label>
              <input
                required
                id="title_tm"
                onChange={(e) => setTitle({ ...title, tm: e.target.value })}
                type="text"
                placeholder="Bölüm adyny giriziň"
                className="border p-2 rounded mr-1 mb-4 w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="flex mb-2" htmlFor="title_ru">
                <img
                  data-tip="Rus dilinde"
                  className="w-8 mr-3"
                  src={RU_FLAG}
                  alt="RU"
                />
                <p> Bölüm ady </p>
              </label>
              <input
                required
                id="title_ru"
                onChange={(e) => setTitle({ ...title, ru: e.target.value })}
                type="text"
                placeholder="Bölüm adyny giriziň"
                className="border p-2 rounded mr-1 mb-4 w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="flex mb-2" htmlFor="title_en">
                <img
                  data-tip="Iňlis dilinde"
                  className="w-8 mr-3"
                  src={EN_FLAG}
                  alt="EN"
                />
                <p> Bölüm ady </p>
              </label>
              <input
                id="title_en"
                onChange={(e) => setTitle({ ...title, en: e.target.value })}
                type="text"
                placeholder="Bölüm adyny giriziň"
                className="border p-2 rounded mr-1 mb-4 w-full"
              />
            </div>
            <button
              onClick={() => categorySave()}
              className="flex items-center justify-center mx-auto text-green-600 hover:bg-green-600 hover:text-white border border-green-600 duration-300 p-2 rounded"
            >
              <IoAddCircleOutline size={22} className="mr-2" /> Sanawa goş
            </button>
          </section>
        </main>
      </section>
    </AppLayout>
  );
};

export default ServiceCategory;
