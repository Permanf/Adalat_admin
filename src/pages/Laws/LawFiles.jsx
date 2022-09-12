import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  IoArrowUndoOutline,
  IoInformationCircleOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import EmptyList from "../../components/Empty/EmptyList";
import getByLocale from "../../helpers/getByLocale";
import AppLayout from "../../layouts/AppLayout";
import { getFiles } from "../../redux/actions/lawsAction";
import api from "../../services/api.service";

import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";
import SmallModal from "../../components/Modal/SmallModal";
import toast from "react-hot-toast";

const LawFiles = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const files = useSelector((state) => state.laws.files);
  const [inputData, setInputData] = useState({
    select_document: "Faýl saýlaň (pdf)",
    document: "",
    locale: "tm",
  });
  const [progress, setProgress] = useState(0);
  const [updated, setUpdated] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({
    delete: false,
  });

  const setDeleteDocument = (locale, confirmation) => {
    setDeleteConfirm({ ...deleteConfirm, locale, delete: confirmation });
  };

  const deleteDocument = () => {
    setDeleteConfirm({ ...deleteConfirm, delete: false });
    try {
      api.delete(`law/${id}/document/${deleteConfirm.locale}`).then((res) => {
        toast.success("Ustunlikli pozuldy", {
          duration: 2000,
        });

        setUpdated(true);
        setTimeout(() => setUpdated(false), 2000);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getFiles(id));
  }, [dispatch, updated]);

  const documentUpload = () => {
    try {
      const formData = new FormData();

      formData.append("document", inputData.document);

      formData.append("locale", inputData.locale);
      console.log(formData["document"],formData["locale"])
      api
        .post(`law/${id}/document/`, formData, {
          onUploadProgress: (progressEvent) => {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        })
        .then((res) => {
          setTimeout(() => setProgress(0), 2000);
          setInputData({
            select_document: "Faýl saýlaň (pdf)",
            document: "",
            locale: "tm",
          });
          setUpdated(true);
          setTimeout(() => setUpdated(false), 2000);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {deleteConfirm.delete && (
        <SmallModal isOpen={deleteConfirm.delete}>
          <aside className="flex flex-col items-center justify-center">
            <h1 className="font-montserrat-bold text-xl">
              {" "}
              {t("confirm_delete")}{" "}
            </h1>

            <div className="flex mt-3">
              <button
                onClick={() => deleteDocument()}
                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 rounded-lg px-6 py-2 my-2 mr-4"
              >
                {t("yes")}
              </button>

              <button
                onClick={() => setDeleteDocument("", false)}
                className="bg-gray-100 text-gray-800 duration-300 rounded-lg px-6 py-2 my-2"
              >
                {t("no")}
              </button>
            </div>
          </aside>
        </SmallModal>
      )}
      <AppLayout>
        <aside className="bg-white p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => history.goBack()}
              className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full"
            >
              <IoArrowUndoOutline size={24} />
            </button>
            <h1 className="text-lg font-bold font-montserrat-bold text-gray-700 mx-4">
              {files && files.title && getByLocale(files.title)}
            </h1>
          </div>
        </aside>

        <section className="grid grid-cols-12 gap-5 my-5">
          <aside className="col-span-12 xl:col-span-5 bg-white px-5 py-4 rounded-xl">
            <div className="bg-blue-50 text-blue-600 border border-blue-200 px-5 py-4 mb-7 rounded-md">
              <IoInformationCircleOutline className="inline" size={28} />
              <p className="inline">
                {" "}
                Faýl diňe pdf görnüşde ýüklemek rugsat edilen.{" "}
              </p>
            </div>

            <div className="flex flex-col my-3">
              <label className="font-bold" htmlFor="logo">
                {" "}
                Faýl saýlaň:{" "}
              </label>

              <div className="relative border border-gray-200 bg-gray-50 rounded-md my-2 px-4 py-2 h-12 overflow-hidden">
                <label
                  className="absolute top-3 left-4 text-gray-400 truncate"
                  htmlFor="file"
                >
                  {inputData.select_document}
                </label>
                <input
                  onChange={(e) => {
                    setInputData({
                      ...inputData,
                      select_document: e.target.files[0].name,
                      document: e.target.files[0],
                    });
                  }}
                  type="file"
                  className="opacity-0 absolute top-0 left-0 right-0 bottom-0 w-full"
                  accept="application/pdf"
                />
              </div>
            </div>

            <label className="font-bold" htmlFor="logo">
              {" "}
              Faýlyň dili:{" "}
            </label>
            <select
              onChange={(e) =>
                setInputData({ ...inputData, locale: e.target.value })
              }
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 my-2 px-4 py-3 w-full rounded-md"
            >
              <option value="tm"> Türkmençe </option>
              <option value="ru"> Русский </option>
              <option value="en"> English </option>
            </select>

            <button
              disabled={progress > 0 ? true : false}
              onClick={documentUpload}
              className={`bg-green-500 text-white px-4 py-2 my-3 rounded-md ${
                progress > 0 ? "opacity-70" : ""
              }`}
            >
              {progress > 0 ? progress + "%" : t("upload")}
            </button>
          </aside>

          <aside className="col-span-12 xl:col-span-7 bg-white px-5 rounded-xl">
            {files && (
              <section className="my-5">
                <main className="text-gray-500 px-4 py-2">
                  <aside className="bg-blue-50 text-blue-600 border border-blue-200 px-5 py-4 mb-7 rounded-md">
                    <IoInformationCircleOutline className="inline" size={28} />
                    <p className="inline">
                      {" "}
                      Bu nama degişli dokument (pdf) faýllar ýüklenmese
                      müşderiler saýtdan ýükläp alyp bilmeyärler. Dokument
                      faýllary 3 dilde ýüklemegiňizi maslahat berýäris.{" "}
                    </p>
                  </aside>

                  <aside className="relative flex items-center justify-between border px-4 py-3 my-3 rounded-md truncate overflow-hidden">
                    <div className="flex items-center">
                      <img className="w-8" src={TM_FLAG} alt="TM" />
                      <p className="text-gray-700 mx-4">
                        {" "}
                        {files.file_tm ? files.file_tm : "faýl ýok"}{" "}
                      </p>
                    </div>

                    <div className="absolute top-0 bottom-0 right-0 bg-white w-12 flex items-center justify-center">
                      <button
                        onClick={() => setDeleteDocument("tm", true)}
                        className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 flex items-center justify-center w-8 h-8 rounded-full"
                      >
                        <IoTrashOutline size={18} />
                      </button>
                    </div>
                  </aside>

                  <aside className="relative flex items-center justify-between border px-4 py-3 my-3 rounded-md truncate overflow-hidden">
                    <div className="flex items-center">
                      <img className="w-8" src={RU_FLAG} alt="RU" />
                      <p className="text-gray-700 mx-4">
                        {" "}
                        {files.file_ru ? files.file_ru : "faýl ýok"}{" "}
                      </p>
                    </div>

                    <div className="absolute top-0 bottom-0 right-0 bg-white w-12 flex items-center justify-center">
                      <button
                        onClick={() => setDeleteDocument("ru", true)}
                        className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 flex items-center justify-center w-8 h-8 rounded-full"
                      >
                        <IoTrashOutline size={18} />
                      </button>
                    </div>
                  </aside>

                  <aside className="relative flex items-center justify-between border px-4 py-3 my-3 rounded-md truncate overflow-hidden">
                    <div className="flex items-center">
                      <img className="w-8" src={EN_FLAG} alt="EN" />
                      <p className="text-gray-700 mx-4">
                        {" "}
                        {files.file_en ? files.file_en : "faýl ýok"}{" "}
                      </p>
                    </div>

                    <div className="absolute top-0 bottom-0 right-0 bg-white w-12 flex items-center justify-center">
                      <button
                        onClick={() => setDeleteDocument("en", true)}
                        className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 flex items-center justify-center w-8 h-8 rounded-full"
                      >
                        <IoTrashOutline size={18} />
                      </button>
                    </div>
                  </aside>
                </main>
              </section>
            )}

            {Object.keys(files).length === 0 && (
              <EmptyList message={t("empty_list")} />
            )}
          </aside>
        </section>
      </AppLayout>
    </>
  );
};

export default LawFiles;
