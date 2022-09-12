import { useTranslation } from "react-i18next";
import { useState } from "react";

import TM_FLAG from "../../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../../assets/images/locales/en.jpg";
import { useDispatch } from "react-redux";
import {
  getQuestionCategories,
  updateQuestionCategory,
} from "../../../redux/actions/questionAnswerAction";

const EditCategory = ({ category, close }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(category.title);

  const saveCategory = (e) => {
    e.preventDefault();

    const data = {
      id: category.id,
      title,
    };

    dispatch(updateQuestionCategory(data));

    setTimeout(() => {
      // dispatch(getQuestionCategories());
      window.location.assign("/question_answer");
      close();
    }, 2000);
  };

  return (
    <form onSubmit={(e) => saveCategory(e)} className="p-3">
      <h1 className="text-xl font-montserrat-bold pb-4"> Bölüm üýtgetmek </h1>

      <aside className="flex flex-col my-4">
        <label className="flex items-center font-bold" htmlFor="title_tm">
          <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
          Bölüm ady
          <p className="text-red-500 text-lg mx-2">*</p>
        </label>
        <input
          id="title_tm"
          type="text"
          required
          onChange={(e) => setTitle({ ...title, tm: e.target.value })}
          placeholder="Bölüm adyny giriziň"
          value={title && title.tm}
          className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
        />
      </aside>

      <aside className="flex flex-col my-4">
        <label className="flex items-center font-bold" htmlFor="title_ru">
          <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
          Bölüm ady
        </label>
        <input
          id="title_ru"
          type="text"
          onChange={(e) => setTitle({ ...title, ru: e.target.value })}
          placeholder="Bölüm adyny giriziň"
          value={title && title.ru}
          className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
        />
      </aside>

      <aside className="flex flex-col my-4">
        <label className="flex items-center font-bold" htmlFor="title_en">
          <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
          Bölüm ady
        </label>
        <input
          id="title_en"
          type="text"
          onChange={(e) => setTitle({ ...title, en: e.target.value })}
          placeholder="Bölüm adyny giriziň"
          value={title && title.en}
          className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
        />
      </aside>

      <div className="flex items-center justify-between">
        <button className="bg-green-500 hover:bg-green-700 duration-300 text-white px-5 py-2.5 rounded-lg">
          {t("save")}
        </button>

        <button
          type="button"
          onClick={() => close()}
          className="bg-gray-100 hover:bg-gray-200 duration-300 text-gray-600 px-5 py-2.5 rounded-lg"
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  );
};
export default EditCategory;
