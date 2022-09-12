import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../layouts/AppLayout";
import ProgressBar from "@ramonak/react-progress-bar";
import api from "../../services/api.service";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const AppUpload = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { client_id, app_order_id } = useParams();
  const [file, setFile] = useState({
    select_file: "Faýl saýlaň (zip,rar)",
    file: "",
  });
  const [expiresAt, setExpiresAt] = useState(null);
  const [clientID, setClientID] = useState(null);
  const [appOrderID, setAppOrderID] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setClientID(client_id);
    setAppOrderID(app_order_id);
  }, []);

  const fileUpload = () => {
    try {
      const formData = new FormData();
      formData.append("expires_at", expiresAt);
      formData.append("client_id", clientID);
      formData.append("app_order_id", appOrderID);
      formData.append("file", file.file);

      api
        .post("/apps", formData, {
          onUploadProgress: (progressEvent) => {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        })
        .then((res) => {
          toast.success("Üstünlikli ýüklendi", { duration: 2000 });
          setFile({
            select_file: "Faýl saýlaň (zip,rar)",
            file: "",
          });
          setExpiresAt(null);
          setClientID(null);
          setAppOrderID(null);
          setTimeout(() => {
            setProgress(0);
            window.location.reload();
          }, 1000);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppLayout>
      <aside className="bg-white px-5 py-3 rounded-lg flex flex-col lg:flex-row lg:items-center justify-between w-full">
        <div>
          <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
            EMTP faýl ýüklemek
          </h1>
        </div>
      </aside>

      <main className="bg-white p-5 my-5 rounded-lg">
        {progress > 0 && (
          <div className="flex flex-col text-white p-2">
            <ProgressBar
              className="mb-3"
              bgColor="#3ead63"
              completed={progress}
              maxCompleted={100}
            />
          </div>
        )}

        <div className="flex flex-col mb-3">
          <label className="font-bold" htmlFor="logo">
            Faýl saýlaň:
          </label>

          <div className="relative border border-gray-200 bg-gray-50 rounded-md my-2 px-4 py-2 h-12 overflow-hidden">
            <label
              className="absolute top-3 left-4 text-gray-400 truncate"
              htmlFor="file"
            >
              {file.select_file}
            </label>
            <input
              onChange={(e) => {
                setFile({
                  ...file,
                  select_file: e.target.files[0].name,
                  file: e.target.files[0],
                });
              }}
              type="file"
              className="opacity-0 absolute top-0 left-0 right-0 bottom-0 w-full"
              accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
            />
          </div>
        </div>

        <div className="flex flex-col mb-3">
          <label className="flex items-center font-bold" htmlFor="expires_at">
            Möhleti (aý/gün/ýyl)
          </label>
          <input
            id="expires_at"
            type="text"
            required
            pattern="[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}"
            onChange={(e) => setExpiresAt(e.target.value)}
            placeholder="dd/mm/YYYY"
            className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
          />
        </div>

        <aside className="grid grid-cols-12 gap-5">
          <div className="col-span-12 xl:col-span-6 flex flex-col mb-3">
            <label className="flex items-center font-bold" htmlFor="client_id">
              Müşderi ID giriziň
            </label>

            <input
              id="client_id"
              type="text"
              required
              onChange={(e) => setClientID(e.target.value)}
              placeholder="101"
              value={clientID}
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </div>

          <div className="col-span-12 xl:col-span-6 flex flex-col mb-3">
            <label
              className="flex items-center font-bold"
              htmlFor="app_order_id"
            >
              Sargyt ID giriziň
            </label>

            <input
              id="app_order_id"
              type="text"
              required
              onChange={(e) => setAppOrderID(e.target.value)}
              placeholder="11"
              value={appOrderID}
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </div>
        </aside>

        <button
          onClick={() => fileUpload()}
          className="bg-green-600 text-white px-10 py-2.5 rounded-lg"
        >
          {t("upload")}
        </button>
      </main>
    </AppLayout>
  );
};

export default AppUpload;
