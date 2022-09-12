import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { IoCloseCircleOutline, IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { setRedirect } from "../../redux/reducers/mainReducer";
import api from "../../services/api.service";

const ServiceCategoryDelete = ({ id, close }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.main.redirect);

  const categoryRemove = () => {
    api
      .delete(`services/categories/${id}`)
      .then((res) => {
        close();
        dispatch(setRedirect(true));
        dispatch(setRedirect(false));
      })
      .catch((err) => toast.error(t("error_not_deleted"), { duration: 2000 }));
  };

  return (
    <>
      {redirect && <Redirect to="/service_categories" />}
      <header className="mb-3">
        <h1 className="text-xl text-center"> {t("confirm_delete")} </h1>
      </header>
      <footer className="bg-white rounded-lg p-5 flex xl:flex-row flex-col">
        <button
          onClick={() => categoryRemove()}
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

export default ServiceCategoryDelete;
