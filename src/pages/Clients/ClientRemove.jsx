import { useTranslation } from "react-i18next";
import { IoCloseCircleOutline, IoTrashOutline } from "react-icons/io5";

const ClientRemove = ({ id, remove, close }) => {
  const { t } = useTranslation();

  return (
    <>
      <header className="mb-3">
        <h1 className="text-xl text-center"> {t("confirm_delete")} </h1>
      </header>
      <footer className="bg-white rounded-lg p-5 flex xl:flex-row flex-col">
        <button
          onClick={() => remove(id)}
          className="flex items-center justify-center mx-auto text-red-600 hover:bg-red-600 hover:text-white border border-red-600 duration-300 px-3 py-2 rounded"
        >
          <IoTrashOutline size={22} className="mr-2" /> {t("remove")}
        </button>

        <button
          onClick={() => close()}
          className="flex items-center justify-center mx-auto text-gray-500 hover:bg-gray-200 hover:text-gray-700 border border-gray-300 duration-300 px-3 py-2 rounded"
        >
          <IoCloseCircleOutline size={22} className="mr-2" /> {t("cancel")}
        </button>
      </footer>
    </>
  );
};

export default ClientRemove;
