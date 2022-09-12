import AppLayout from "../../layouts/AppLayout";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "react-html-parser";

import api from "../../services/api.service";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import getByLocale from "../../helpers/getByLocale";
import MiniLoader from "../../components/Loader/MiniLoader";
import s from './showLegalAid.module.css'
const ShowLegalAid = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [legalAid, setLegalAid] = useState([]);
  const [fetching, setFetchging] = useState(false)
  useEffect(async () => {
    setFetchging(true)
    await api
      .get(`legal_aids/${id}`, {
        headers: {
          "Accept-Language": i18n.language
        }
      })
      .then((res) => {
        setLegalAid(res.data.data);
      })
      .catch((err) => console.log(err));

    setFetchging(false)

  }, []);
  // debugger
  return (
    <AppLayout>
      <main className="bg-white py-6 px-8 rounded-lg">
        <div className={s.wrapper}>
          {fetching ? <div className="text-center"><MiniLoader /></div> : <>
            <h1 className="text-xl mb-5"> {getByLocale(legalAid.title)} </h1>
            <p className="text-gray-500"> {ReactHtmlParser(getByLocale(legalAid.text))} </p>
          </>}
        </div>
      </main>
    </AppLayout>
  );
};

export default ShowLegalAid;
