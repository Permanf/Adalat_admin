import { Redirect } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";

import Header from "./../components/Header/Header";
import { setAuth, setUser } from "../redux/actions/userAction";
import AuthService from "../services/AuthService";
import { Toaster } from "react-hot-toast";
import { setRedirect } from "../redux/reducers/mainReducer";
import Loader from "../components/Loader/Loader";
import ReactTooltip from "react-tooltip";

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const token = Cookie.get("admin_token");
  const user = useSelector((state) => state.user.user);
  const redirect = useSelector((state) => state.main.redirect);
  const loading = useSelector((state) => state.main.loading);
  const [minuMenu, setMiniMenu] = useState(false);

  // useEffect(() => {
  //     window.scrollTo({
  //         top: 0,
  //         behavior: 'smooth',
  //     })
  // }, [])

  useEffect(() => {
    redirect && setRedirect(false);
    if (user?.length === 0) {
      token &&
        AuthService.me()
          .then((res) => {
            dispatch(setUser(res.data.data));
            dispatch(setAuth(true));
          })
          .catch((err) => {
            Cookie.remove("admin_token");
          });
    }
  }, []);

  return (
    <>
      {!token && <Redirect to="/login" />}

      {loading && <Loader />}

      <ReactTooltip className="font-montserrat-bold" />

      <Toaster
        toastOptions={{
          className: "font-montserrat-medium p-4",
        }}
      />
      <Header miniMenu={minuMenu} setMiniMenu={setMiniMenu} />

      <motion.div
        initial={{ y: "-5vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "tween", duration: 0.7 }}
      >
        <section
          className={`relative font-montserrat-medium ${
            minuMenu ? "lg:ml-20" : "lg:ml-72"
          } lg:pl-9 lg:mr-2 mt-20 px-3 lg:px-6 duration-1000`}
        >
          {children}
        </section>
      </motion.div>
    </>
  );
};

export default AppLayout;
