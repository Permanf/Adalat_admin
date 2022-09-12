import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoAddCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import api from "../../services/api.service";

import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";

const ServiceCategoryItemEdit = ({ item, close }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setTitle(item.title);
    setPrice(item.price);
  }, []);

  const categorySave = () => {
    title &&
      title.tm &&
      title.tm.length > 0 &&
      title &&
      title.ru &&
      title.ru.length > 0 &&
      api
        .put(`services/categories/${item.id}/item`, { title, price })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
  };

  return (
    <>
      <section className="bg-white rounded-lg p-5 flex flex-col">
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
            value={title && title.tm}
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
            value={title && title.ru}
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
            value={title && title.en}
            className="border p-2 rounded mr-1 mb-4 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label className="flex items-center mb-2" htmlFor="price">
            <p> Hyzmatyň bahasy </p>
          </label>
          <input
            id="price"
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Hyzmatyň bahasyny giriziň"
            value={price}
            className="border p-2 rounded mr-1 mb-4 w-full"
          />
        </div>

        <footer className="flex xl:flex-row flex-col">
          <button
            onClick={() => categorySave()}
            className="flex items-center justify-center mx-auto text-green-600 hover:bg-green-600 hover:text-white border border-green-600 duration-300 px-3 py-2 rounded"
          >
            <IoAddCircleOutline size={22} className="mr-2" /> {t("save")}
          </button>

          <button
            onClick={() => close()}
            className="flex items-center justify-center mx-auto text-gray-500 hover:bg-gray-200 hover:text-gray-700 border border-gray-300 duration-300 px-3 py-2 rounded"
          >
            <IoCloseCircleOutline size={22} className="mr-2" /> {t("cancel")}
          </button>
        </footer>
      </section>
    </>
  );
};

export default ServiceCategoryItemEdit;
