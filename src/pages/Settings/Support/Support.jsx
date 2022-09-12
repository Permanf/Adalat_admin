import AppLayout from "../../../layouts/AppLayout";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import { getContacts } from "../../../redux/actions/contactAction";
import EmptyList from "../../../components/Empty/EmptyList";

const Support = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.contacts);
  const total = useSelector((state) => state.contact.total);
  const lastPage = useSelector((state) => state.contact.last_page);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getContacts(page));
  }, [page]);

  return (
    <AppLayout>
      <aside className="bg-white px-5 py-3 rounded-lg flex items-center justify-between">
        <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
          {t("support")}
        </h1>
        <small>
          {t("total")}: {total}
        </small>
      </aside>

      {contacts.length === 0 && <EmptyList message={t("empty_list")} />}

      {contacts.length > 0 && (
        <main>
          <table className="w-full my-3 rounded-lg overflow-hidden">
            <thead className="bg-white border-b text-gray-900 text-left">
              <tr>
                <th className="px-5 py-2"> F.A.A </th>
                <th className="px-5 py-2"> Welaýat (şäher) </th>
                <th className="px-5 py-2"> Etrap </th>
                <th className="px-5 py-2"> Sene </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => {
                return (
                  <tr key={index} className="border-b">
                    <td className="bg-white px-5 py-3 my-3">
                      <NavLink
                        to={`/support/${contact.id}`}
                        className="text-green-600 mr-2"
                      >
                        <p className="inline mr-2">{contact.firstname}</p>
                        <p className="inline mr-2">{contact.lastname}</p>
                        <p className="inline">{contact.fathername}</p>
                      </NavLink>
                    </td>
                    <td className="bg-white px-5 py-3 my-3">{contact.city}</td>
                    <td className="bg-white px-5 py-3 my-3">
                      {contact.district}
                    </td>
                    <td className="bg-white px-5 py-3 my-3">
                      {contact.created_at}
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
    </AppLayout>
  );
};

export default Support;
