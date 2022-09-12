import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  IoCheckmarkDoneCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import api from "../../../services/api.service";

const SmsTemplateEditModal = ({ id, template, close }) => {
  const { t } = useTranslation();
  const [text, setText] = useState(template ?? "");

  useEffect(() => {
    setText(template);
  }, []);

  const saveTemplate = () => {
    api
      .put(`sms_templates/${id}`, { text })
      .then((res) => {
        toast.success(t("success_saved"), { duration: 2000 });
        close();
      })
      .catch((err) => {
        toast.error(t("error_not_saved"), { duration: 2000 });
        close();
      });
  };

  return (
    <main>
      <textarea
        className="border border-gray-100 rounded-lg w-full h-32 p-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      >
        {text}
      </textarea>
      <footer className="bg-white rounded-lg my-4 flex xl:flex-row flex-col justify-between">
        <button
          onClick={() => saveTemplate()}
          className="flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white border border-green-600 duration-300 px-3 py-2 rounded"
        >
          <IoCheckmarkDoneCircleOutline size={22} className="mr-2" />
          {t("save")}
        </button>

        <button
          onClick={() => close()}
          className="flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-700 border border-gray-300 duration-300 px-3 py-2 rounded"
        >
          <IoCloseCircleOutline size={22} className="mr-2" /> {t("cancel")}
        </button>
      </footer>
    </main>
  );
};

export default SmsTemplateEditModal;
