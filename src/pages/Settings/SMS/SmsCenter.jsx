import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoArrowUndoOutline,
  IoFileTrayOutline,
  IoFilterOutline,
  IoReceiptOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import EmptyList from "../../../components/Empty/EmptyList";
import AppLayout from "../../../layouts/AppLayout";
import { getSmsCounts, getSmsList } from "../../../redux/actions/smsAction";
import ReactPaginate from "react-paginate";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import api from "../../../services/api.service";

const SmsCenter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const sms_list = useSelector((state) => state.sms.sms_list);
  const sms_counts = useSelector((state) => state.sms.sms_counts);
  const [page, setPage] = useState(1);
  const total = useSelector((state) => state.sms.total);
  const lastPage = useSelector((state) => state.sms.last_page);
  const [dates, onChange] = useState([new Date(), new Date()]);

  useEffect(() => {
    dispatch(getSmsList(page));
  }, [page]);

  useEffect(() => {
    dispatch(getSmsCounts());
  }, []);

  const smsFiltered = () => {
    dispatch(getSmsList(page, dates));
  };

  const smsExport = () => {
    // dispatch(getSmsList(page, dates));
    api
      .get("sms_export")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <AppLayout>
      <section>
        <header className="bg-white p-3 rounded-lg flex items-center justify-between">
          <aside className="flex items-center">
            <button
              onClick={() => history.goBack()}
              className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full mr-3"
            >
              <IoArrowUndoOutline size={24} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
                {t("sms_center")}
              </h1>
              <small className="flex font-montserrat-medium text-sm text-gray-500">
                <p>{t("total")}:</p>
                <p className="ml-2">{total}</p>
              </small>
            </div>
          </aside>
        </header>

        <section className="grid grid-cols-12 gap-5 my-5">
          <main className="col-span-12 xl:col-span-8 order-2 xl:order-1 bg-white rounded-xl px-5 py-3">
            <h1 className="text-lg font-montserrat-bold">{t("sms_list")}</h1>
            {sms_list.length === 0 && <EmptyList message={t("empty_list")} />}

            {sms_list.length > 0 && (
              <table className="w-full overflow-x-auto my-5">
                <thead className="text-left bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 w-56 rounded-tl-lg rounded-bl-lg">
                      {t("phone")}
                    </th>
                    <th className="px-3 py-2 truncate">{t("text")}</th>
                    <th className="px-3 py-2 w-48 rounded-tr-lg rounded-br-lg">
                      {t("date")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sms_list.map((sms, index) => {
                    return (
                      <tr key={index}>
                        <td className="align-top px-3 py-2 border-b border-gray-100">
                          {sms.phone}
                        </td>
                        <td className="px-3 py-2 border-b border-gray-100">
                          {sms.text}
                        </td>
                        <td className="align-top px-3 py-2 border-b border-gray-100">
                          {sms.created_at}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </main>

          <aside className="col-span-12 xl:col-span-4 order-1 xl:order-2 bg-white rounded-xl p-5">
            <NavLink
              to="/sms_templates"
              className="flex bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-800 duration-300 px-8 py-3 w-full text-lg border border-green-200 rounded-lg"
            >
              <IoReceiptOutline size={24} />
              <p className="font-montserrat-bold mx-2">{t("sms_templates")}</p>
            </NavLink>

            <colgroup className="grid grid-cols-12 gap-5 mt-7">
              <div className="border border-gray-100 col-span-6 font-montserrat-bold flex flex-col items-center justify-center p-5 rounded-2xl">
                <h1 className="text-md xl:text-xl text-gray-600">1 aýda</h1>
                <p className="text-xs xl:text-md text-green-600 mt-2">
                  {sms_counts.monthTotal}
                </p>
              </div>

              <div className="border border-gray-100 col-span-6 font-montserrat-bold flex flex-col items-center justify-center p-5 rounded-2xl">
                <h1 className="text-md xl:text-xl text-gray-600">6 aýda</h1>
                <p className="text-xs xl:text-md text-green-600 mt-2">
                  {sms_counts.sixMonthTotal}
                </p>
              </div>

              <div className="border border-gray-100 col-span-6 font-montserrat-bold flex flex-col items-center justify-center p-5 rounded-2xl">
                <h1 className="text-md xl:text-xl text-gray-600">1 ýylda</h1>
                <p className="text-xs xl:text-md text-green-600 mt-2">
                  {sms_counts.yearTotal}
                </p>
              </div>

              <div className="border border-gray-100 col-span-6 font-montserrat-bold flex flex-col items-center justify-center p-5 rounded-2xl">
                <h1 className="text-md xl:text-xl text-gray-600">Jemi</h1>
                <p className="text-xs xl:text-md text-green-600 mt-2">
                  {sms_counts.total}
                </p>
              </div>
            </colgroup>

            <div className="flex items-center justify-between mt-5">
              <DateRangePicker
                className="my-5 rounded-xl border"
                calendarClassName="my-5 rounded-xl overflow-hidden"
                onChange={onChange}
                value={dates}
                format="dd-MM-y"
                dayPlaceholder="gun"
                monthPlaceholder="ay"
                yearPlaceholder="yyl"
              />

              <div>
                <button
                  onClick={() => smsFiltered()}
                  className="border border-green-500 hover:bg-green-500 text-green-500 hover:text-white duration-300 p-2 rounded-xl mr-2"
                >
                  <IoFilterOutline size={24} />
                </button>

                <button
                  onClick={() => smsExport()}
                  className="border border-green-500 hover:bg-green-500 text-green-500 hover:text-white duration-300 p-2 rounded-xl"
                >
                  <IoFileTrayOutline size={24} />
                </button>
              </div>
            </div>
          </aside>
        </section>

        {lastPage > 1 && (
          <ReactPaginate
            previousClassName={"hidden"}
            nextClassName={"hidden"}
            breakLabel={"..."}
            breakClassName={
              "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm"
            }
            pageCount={lastPage}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={(data) => setPage(data.selected + 1)}
            pageLinkClassName={
              "bg-white rounded-xl border-gray-300 hover:text-gray-800 hover:bg-gray-50 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm"
            }
            containerClassName={
              "relative z-0 inline-flex justify-center rounded-md mb-16 w-full"
            }
            activeLinkClassName={
              "bg-green-600 border-green-600 text-white font-montserrat-bold"
            }
          />
        )}
      </section>
    </AppLayout>
  );
};

export default SmsCenter;
