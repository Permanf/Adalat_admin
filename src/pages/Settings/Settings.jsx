import { useTranslation } from "react-i18next";
import {
  IoArrowUndoOutline,
  IoCogOutline,
  IoEarth,
  IoLibraryOutline,
  IoImagesOutline,
  IoInformationCircleOutline,
  IoLocationOutline,
  IoMailOutline,
  IoMegaphoneOutline,
  IoStatsChartOutline,
  IoBookmarksOutline,
} from "react-icons/io5";
import { NavLink, useHistory } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

const Settings = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <AppLayout>
      <aside className="bg-white p-3 rounded-lg flex items-center">
        <button
          onClick={() => history.goBack()}
          className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full"
        >
          <IoArrowUndoOutline size={24} />
        </button>
        <h1 className="text-lg font-bold font-montserrat-bold text-gray-700 ml-3">
          {t("settings")}
        </h1>
      </aside>

      <main className="grid grid-cols-12 gap-5 xl:gap-10 bg-white shadow-gray-sm p-5 xl:p-12 rounded-xl my-7">
        <NavLink
          to="/banners"
          className="col-span-12 xl:col-span-4 bg-gray-50 hover:bg-green-500 hover:text-white duration-500 text-gray-600 rounded-xl p-5 cursor-pointer"
        >
          <IoImagesOutline size={42} />
          <div className="flex flex-col mt-4">
            <h1 className="text-md font-montserrat-bold uppercase">
              Ähli bannerlar
            </h1>
            <p className="text-sm"> Saýtdaky ähli bannerlar sanawy </p>
          </div>
        </NavLink>

        <NavLink
          to="/subscribers"
          className="col-span-12 xl:col-span-4 bg-gray-50 hover:bg-green-500 hover:text-white duration-500 text-gray-600 rounded-xl p-5 cursor-pointer"
        >
          <IoMegaphoneOutline size={42} />
          <div className="flex flex-col mt-4">
            <h1 className="text-md font-montserrat-bold uppercase">
              {t("subscribers")}
            </h1>
            <p className="text-sm"> Täzeliklere ýazylan müşderiler sanawy </p>
          </div>
        </NavLink>

        <NavLink
          to="/statistics"
          className="col-span-12 xl:col-span-4 bg-gray-50 hover:bg-green-500 hover:text-white duration-500 text-gray-600 rounded-xl p-5 cursor-pointer"
        >
          <IoStatsChartOutline size={42} />
          <div className="flex flex-col mt-4">
            <h1 className="text-md font-montserrat-bold uppercase">
              {t("statistics")}
            </h1>
            <p className="text-sm"> Hyzmatlar hasabatlar </p>
          </div>
        </NavLink>

        <NavLink
          to="/sites"
          className="col-span-12 xl:col-span-4 bg-gray-50 hover:bg-green-500 hover:text-white duration-500 text-gray-600 rounded-xl p-5 cursor-pointer"
        >
          <IoEarth size={42} />
          <div className="flex flex-col mt-4">
            <h1 className="text-md font-montserrat-bold uppercase">
              {t("sites")}
            </h1>
            <p className="text-sm"> Türkmenistanyň peýdaly web saýtlary </p>
          </div>
        </NavLink>

        <NavLink
          to="/provinces"
          className="relative col-span-12 xl:col-span-4 bg-gray-50 hover:bg-green-500 hover:text-white duration-500 text-gray-600 rounded-xl p-5"
        >
          <IoLocationOutline size={42} />
          <div className="flex flex-col mt-4">
            <h1 className="text-md font-montserrat-bold uppercase">
              {t("province")}
            </h1>
            <p className="text-sm"> Türkmenistanyň welaýat, şäherleri </p>
          </div>
        </NavLink>

        <NavLink
          to="/about"
          className="relative col-span-12 xl:col-span-4 bg-gray-50 hover:bg-green-500 hover:text-white duration-500 text-gray-600 rounded-xl p-5"
        >
          <IoInformationCircleOutline size={50} />
          <div className="flex flex-col mt-4">
            <h1 className="text-md font-montserrat-bold uppercase">
              {t("about")}
            </h1>
            <p className="text-sm"> Türkmenistanyň Adalat ministrlik barada </p>
          </div>
        </NavLink>

        {/* <NavLink
          to="/databases"
          className="relative col-span-12 xl:col-span-4 bg-gray-50 hover:bg-green-500 hover:text-white duration-500 text-gray-600 rounded-xl p-5"
        >
          <small className="text-red-600 uppercase font-montserrat-bold absolute top-3 right-3">
            IŞLENÝÄR
          </small>
          <IoFileTrayStackedOutline size={50} />
          <div className="flex flex-col mt-4">
            <h1 className="text-md font-montserrat-bold uppercase">
              {t("databases")}
            </h1>
            <p className="text-sm"> {t("databases_description")} </p>
          </div>
        </NavLink> */}

        <NavLink
          to="/sms_center"
          className="relative col-span-12 xl:col-span-4 bg-gray-50 hover:bg-green-500 hover:text-white duration-500 text-gray-600 rounded-xl p-5"
        >
          <IoMailOutline size={50} />
          <div className="flex flex-col mt-4">
            <h1 className="text-md font-montserrat-bold uppercase">
              {t("sms_center")}
            </h1>
            <p className="text-sm"> {t("sms_center_description")} </p>
          </div>
        </NavLink>

        <NavLink
          to="/service_categories"
          className="relative col-span-12 xl:col-span-4 bg-gray-50 hover:bg-green-500 hover:text-white duration-500 text-gray-600 rounded-xl p-5"
        >
          <IoCogOutline size={50} />
          <div className="flex flex-col mt-4">
            <h1 className="text-md font-montserrat-bold uppercase">
              {t("service_category")}
            </h1>
            <p className="text-sm"> {t("service_category_description")} </p>
          </div>
        </NavLink>

        <NavLink
          to="/question_answer"
          className="relative col-span-12 xl:col-span-4 bg-gray-50 hover:bg-green-500 hover:text-white duration-500 text-gray-600 rounded-xl p-5"
        >
          <IoLibraryOutline size={50} />
          <div className="flex flex-col mt-4">
            <h1 className="text-md font-montserrat-bold uppercase">
              {t("question_answer")}
            </h1>
            <p className="text-sm"> {t("question_answer_description")} </p>
          </div>
        </NavLink>

        <NavLink
          to="/legalaid"
          className="relative col-span-12 xl:col-span-4 bg-gray-50 hover:bg-green-500 hover:text-white duration-500 text-gray-600 rounded-xl p-5"
        >
          <IoBookmarksOutline size={50} />
          <div className="flex flex-col mt-4">
            <h1 className="text-md font-montserrat-bold uppercase">
              {t("legal_aid")}
            </h1>
            <p className="text-sm"> {t("legal_aid_description")} </p>
          </div>
        </NavLink>
      </main>
    </AppLayout>
  );
};

export default Settings;
