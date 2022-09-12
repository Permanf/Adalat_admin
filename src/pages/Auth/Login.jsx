import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Cookie from "js-cookie";
import Logo from "../../assets/logo.png";
import AuthService from "../../services/AuthService";
import BackgroundImage from "../../assets/images/background.webp";
import { SyncLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const token = Cookie.get("admin_token");

  useEffect(() => {
    token && window.location.assign("/");
  }, [token]);

  const onSubmit = (e) => {
    e.preventDefault();

    setLoader(true);
    AuthService.login(username, password)
      .then((res) => {
        Cookie.set("admin_token", res.data?.token, { expires: 1 });
        window.location.assign("/profile");
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Adyňyz ýa-da email nädogry", { duration: 1500 });
        setLoader(false);
        console.log(err);
      });
  };

  return (
    <motion.section
      initial={{ y: "-5vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "tween", duration: 0.7 }}
    >
      <Toaster
        toastOptions={{
          className: "font-montserrat-medium p-4",
        }}
      />

      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-40 opacity-50 backdrop-filter backdrop-blur-xl"></div>
      <img
        className="fixed top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
        src={BackgroundImage}
      />

      <main className="flex flex-col items-center justify-center min-h-screen font-montserrat-medium">
        <form
          onSubmit={(e) => onSubmit(e)}
          className="bg-white-50 w-96 p-10 rounded-xl z-50"
        >
          <aside className="flex items-center w-full pb-5">
            <img className="w-16 p-1 ml-3" src={Logo} alt="Adalat ministrlik" />
            <p className="text-green-600 text-md uppercase font-montserrat-bold ml-2">
              Türkmenistanyň Adalat ministrligi
            </p>
          </aside>
          <div className="flex flex-col mb-3">
            <label
              htmlFor="username"
              className="font-montserrat-bold text-gray-600 text-sm uppercase py-2"
            >
              {t("name_or_email")}:
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              type="text"
              required
              value={username}
              placeholder="Adyňyz ýa-da email"
              className="bg-white px-5 py-3 border-2 border-gray-100 rounded-xl focus:outline-none duration-400 transition focus:border-green-500"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label
              htmlFor="password"
              className="font-montserrat-bold text-gray-600 text-sm uppercase py-2"
            >
              {t("password")}:
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              required
              value={password}
              placeholder="Açarsözi giriziň"
              className="bg-white px-5 py-3 border-2 border-gray-100 rounded-xl focus:outline-none duration-400 transition focus:border-green-500"
            />
          </div>

          <button className="bg-green-600 hover:bg-green-800 duration-700 px-5 py-4 font-montserrat-bold uppercase rounded-xl text-white w-full mt-3">
            {loader ? <SyncLoader color="white" /> : t("login")}
          </button>
        </form>
      </main>
    </motion.section>
  );
};

export default Login;
