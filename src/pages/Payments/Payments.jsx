import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import EmptyList from "../../components/Empty/EmptyList";
import AppLayout from "../../layouts/AppLayout";
import ReactPaginate from "react-paginate";
import { getPayments } from "../../redux/actions/paymentAction";

const Payments = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payment.payments);
  const total = useSelector((state) => state.payment.total);
  const lastPage = useSelector((state) => state.payment.last_page);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    dispatch(getPayments(page));
  }, [page]);

  return (
    <AppLayout>
      <section>
        <aside className="bg-white px-5 py-3 rounded-lg flex flex-col lg:flex-row lg:items-center justify-between w-full">
          <div>
            <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
              {t("payments")}
            </h1>
            <small>
              {t("total")}: {total}
            </small>
          </div>
        </aside>

        {payments.length === 0 && <EmptyList message={t("empty_list")} />}

        {payments.length > 0 && (
          <main>
            <table className="w-full my-3 rounded-lg overflow-hidden">
              <thead className="bg-white border-b text-gray-900 text-left">
                <tr>
                  <th className="px-5 py-2"> T/b </th>
                  <th className="px-5 py-2"> F.A.A </th>
                  <th className="px-5 py-2"> Sene </th>
                  <th className="px-5 py-2"> Status </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => {
                  return (
                    <tr key={index} className="border-b">
                      <td className="bg-white px-5 py-3 my-3">{payment.id}</td>
                      <td className="bg-white px-5 py-3 my-3">
                        <NavLink
                          to={`/adalat_emtp/${payment.id}`}
                          className="text-green-600 mr-2"
                        >
                          {payment.fullname}
                        </NavLink>
                      </td>
                      <td className="bg-white px-5 py-3 my-3">
                        {payment.created_at}
                      </td>
                      <td className="bg-white px-5 py-3 my-3">
                        {payment.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </main>
        )}

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

export default Payments;
