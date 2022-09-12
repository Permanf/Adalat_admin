import {
  IoHomeOutline,
  IoPeopleOutline,
  IoNewspaperOutline,
  IoDocumentTextOutline,
  IoCogOutline,
  IoStatsChartOutline,
  IoBusinessOutline,
  IoPersonOutline,
  IoEarth,
  IoDocumentsOutline,
  IoArrowBackCircleOutline,
  IoSettingsOutline,
  IoArrowBack,
  IoBriefcaseOutline,
  IoMegaphoneOutline,
  IoDocumentAttachOutline,
  IoChatboxEllipsesOutline,
  IoFileTrayFullOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import Locale from "../Locale/Locale";

const Header = ({ miniMenu, setMiniMenu }) => {
  const { t } = useTranslation();
  const isAuth = useSelector((state) => state.user.isAuth);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <section className="fixed top-0 left-0 right-0 z-10">
      {showMenu && (
        <AnimatePresence>
          <motion.div
            onClick={() => setShowMenu(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.7 }}
            className="bg-green-600 backdrop-filter backdrop-blur-md opacity-50 fixed top-16 left-0 bottom-0 right-0 z-40"
          >
            <IoArrowBackCircleOutline
              color="white"
              size={72}
              className="absolute mt-10 top-1/3 right-3"
            />
          </motion.div>
        </AnimatePresence>
      )}
      <header
        className={`bg-white shadow border ${
          miniMenu ? "w-20" : "w-72"
        } fixed transform overflow-y-auto ${
          showMenu ? "translate-x-0" : "-translate-x-80"
        } lg:translate-x-0 top-24 lg:top-16 left-0 bottom-10 lg:bottom-0 duration-700 z-50 rounded-r-3xl lg:rounded-none`}
      >
        <nav className="mt-5 px-3">
          <button
            onClick={() => setMiniMenu(!miniMenu)}
            className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full absolute left-5 bottom-3 overflow-hidden"
          >
            <IoArrowBack
              className={`transform ${miniMenu ? "rotate-180" : "rotate-0"}`}
            />
          </button>
          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoHomeOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="24"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("home")}
            </p>
          </NavLink>
          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/news"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoNewspaperOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="24"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("news")}
            </p>
          </NavLink>
          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/posts"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoNewspaperOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="24"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("posts")}
            </p>
          </NavLink>
          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/events"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoNewspaperOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="24"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("events")}
            </p>
          </NavLink>
          {/* <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/services"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoCogOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="24"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("service")}
            </p>
          </NavLink> */}
          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/lawyers"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoBriefcaseOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="24"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("lawyers")}
            </p>
          </NavLink>
          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/laws"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoDocumentTextOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="24"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("laws")}
            </p>
          </NavLink>
          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/legalActs"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoDocumentTextOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="24"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("legal_acts")}
            </p>
          </NavLink>
          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/legislations"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoDocumentTextOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="24"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("yatlama")}
            </p>
          </NavLink>
          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/departments"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoBusinessOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="24"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("departments")}
            </p>
          </NavLink>
          {/* adalat-edaralary */}
          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/adalat-edaralary"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoBusinessOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="24"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
             Adalat {t("departments")}
            </p>
          </NavLink>
          {/* end */}
          {/* <NavLink
                        exact
                        activeClassName="text-green-700 font-bold"
                        to="/contracts"
                        className={`hover:text-green-600 flex items-center ${miniMenu ? 'p-3 justify-center' : 'px-4 py-3'} overflow-hidden border-b duration-500`}
                    >
                        <IoDocumentsOutline className={`${miniMenu ? 'm-0' : 'mr-3'}`} size="24" />
                        <p className={`${miniMenu ? 'absolute -left-96' : 'absolute left-16'} text-sm font-montserrat-medium text-center`}> { t('contracts') } </p>
                    </NavLink> */}
          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/clients"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoPeopleOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="24"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("clients")}
            </p>
          </NavLink>
          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/questions"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoDocumentAttachOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="26"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("questions")}
            </p>
          </NavLink>

          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/support"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoChatboxEllipsesOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="26"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("support")}
            </p>
          </NavLink>

          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/adalat_emtp"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoFileTrayFullOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="26"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("adalat_emtp")}
            </p>
          </NavLink>

          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/payments"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoWalletOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="26"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("payments")}
            </p>
          </NavLink>

          <NavLink
            exact
            activeClassName="text-green-700 font-bold"
            to="/settings"
            className={`hover:text-green-600 flex items-center ${
              miniMenu ? "p-3 justify-center" : "px-4 py-3"
            } overflow-hidden border-b duration-500`}
          >
            <IoSettingsOutline
              className={`${miniMenu ? "m-0" : "mr-3"}`}
              size="26"
            />
            <p
              className={`${
                miniMenu ? "absolute -left-96" : "absolute left-16"
              } text-sm font-montserrat-medium text-center`}
            >
              {t("settings")}
            </p>
          </NavLink>

          {/* <NavLink
                        activeClassName="text-gray-900"
                        to="/icons" 
                        className={`hover:text-green-600 flex items-center ${miniMenu ? 'p-3 justify-center' : 'px-4 py-3'} overflow-hidden border-b duration-500`}
                    >
                        <IoColorPaletteOutline className={`${miniMenu ? 'm-0' : 'mr-3'}`} size="24" />
                        <p className={`${miniMenu ? 'absolute -left-96' : 'absolute left-16'} text-sm font-montserrat-medium text-center`}> Icons </p>
                    </NavLink> */}
        </nav>
      </header>

      <header className="bg-white shadow-gray flex items-center justify-between h-16 z-50">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="lg:hidden focus:outline-none group"
        >
          <HiOutlineMenuAlt1
            size={28}
            className="text-gray-700 group-hover:text-green-700 duration-300 mx-4"
          />
        </button>
        <aside className="flex items-center w-60 p-3">
          <img className="w-12 p-1 ml-3" src={Logo} alt="Adalat ministrlik" />
          <p className="text-green-700 text-xs uppercase font-montserrat-bold ml-2">
            Türkmenistanyň Adalat ministrligi
          </p>
        </aside>

        <aside className="flex items-center mr-4">
          <div className="flex items-center relative mr-3 lg:mr-5">
            <Locale />
          </div>

          {isAuth ? (
            <NavLink
              to="/profile"
              className="text-green-600 border border-white hover:border-green-600 p-2 duration-500 text-sm font-montserrat-bold rounded-full"
            >
              <IoPersonOutline size={22} />
            </NavLink>
          ) : (
            <NavLink
              to="login"
              className="text-green-600 border border-white hover:border-green-600 p-2 duration-500 text-sm font-montserrat-bold rounded-full"
            >
              <IoPersonOutline size={22} />
            </NavLink>
          )}
        </aside>
      </header>
    </section>
  );
};

export default Header;
