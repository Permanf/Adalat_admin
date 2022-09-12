import AppLayout from "../../layouts/AppLayout";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  IoArrowUndoOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoPencilOutline,
} from "react-icons/io5";
import { useHistory } from "react-router-dom";

import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";
import SmallModal from "../../components/Modal/SmallModal";
import {
  loadProvinces,
  saveProvince,
} from "../../redux/actions/provinceAction";
import getByLocale from "../../helpers/getByLocale";
import { setLoading } from "../../redux/reducers/mainReducer";

const Provinces = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [editForm, setEditForm] = useState({ edit: false });
  const [province, setProvince] = useState([]);
  const provinces = useSelector((state) => state.province.provinces);
  const total = useSelector((state) => state.province.count);

  useEffect(() => {
    dispatch(loadProvinces());
  }, []);

  const showEditForm = (province) => {
    setEditForm({ ...editForm, edit: true });
    setProvince(province);
  };

  const hideEditForm = () => {
    setEditForm({ ...editForm, edit: false });
    setProvince([]);
  };

  const _saveProvince = (e) => {
    e.preventDefault();

    dispatch(setLoading(true));
    dispatch(saveProvince(province));
    hideEditForm();
  };

  return (
    <>
      {editForm.edit && (
        <SmallModal isOpen={editForm.edit}>
          <form
            onSubmit={(e) => _saveProvince(e)}
            className="bg-white p-5 rounded-md"
          >
            <div className="flex items-center border rounded-md overflow-hidden px-2 my-4">
              <img className="w-8" src={TM_FLAG} alt="TM" />
              <input
                onChange={(e) =>
                  setProvince({
                    ...province,
                    name: { ...province.name, tm: e.target.value },
                  })
                }
                type="text"
                value={province && province.name && province.name.tm}
                className="px-3 py-3 w-full"
                placeholder="Türkmen dilinde ady"
              />
            </div>

            <div className="flex items-center border rounded-md overflow-hidden px-2 my-4">
              <img className="w-8" src={RU_FLAG} alt="RU" />
              <input
                onChange={(e) =>
                  setProvince({
                    ...province,
                    name: { ...province.name, ru: e.target.value },
                  })
                }
                type="text"
                value={province && province.name && province.name.ru}
                className="px-3 py-3 w-full"
                placeholder="Rus dilinde ady"
              />
            </div>

            <div className="flex items-center border rounded-md overflow-hidden px-2 my-4">
              <img className="w-8" src={EN_FLAG} alt="EN" />
              <input
                onChange={(e) =>
                  setProvince({
                    ...province,
                    name: { ...province.name, en: e.target.value },
                  })
                }
                type="text"
                value={province && province.name && province.name.en}
                className="px-3 py-3 w-full"
                placeholder="Iňlis dilinde ady"
              />
            </div>

            <div className="flex items-center justify-between mt-8">
              <button className="flex items-center border border-green-500 text-green-600 hover:bg-green-500 hover:text-white duration-300 px-4 py-1.5 rounded-md">
                <IoCheckmarkCircleOutline size={32} />
                <p className="mx-3"> {t("save")} </p>
              </button>

              <button
                onClick={() => hideEditForm()}
                className="flex items-center border border-gray-300 text-gray-500 hover:bg-gray-300 hover:text-gray-700 duration-300 px-3 py-1.5 rounded-md"
              >
                <IoCloseCircleOutline size={32} />
              </button>
            </div>
          </form>
        </SmallModal>
      )}

      <AppLayout>
        <aside className="bg-white px-5 py-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => history.goBack()}
              className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full"
            >
              <IoArrowUndoOutline size={24} />
            </button>
            <div className="flex flex-col ml-4">
              <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
                {t("province")}
              </h1>
              <small>
                {t("total")}: {total}
              </small>
            </div>
          </div>
        </aside>

        <main className="bg-white px-5 py-3 rounded-md my-5">
          {provinces &&
            provinces.map((province, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between border-b px-3 py-2"
                >
                  <p> {getByLocale(province.name)} </p>
                  <button
                    onClick={() => showEditForm(province)}
                    className="flex items-center justify-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white duration-300 w-8 h-8 rounded-full"
                  >
                    <IoPencilOutline size={18} />
                  </button>
                </div>
              );
            })}
        </main>
      </AppLayout>
    </>
  );
};

export default Provinces;
