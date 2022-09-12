import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import EmptyList from "../../components/Empty/EmptyList";
import ReactPaginate from "react-paginate";
import ReactHtmlParser from "react-html-parser";
import AppLayout from "../../layouts/AppLayout";
import {
  IoCheckmarkDoneCircleOutline,
  IoCloseCircleOutline,
  IoCloseOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";
import api from "../../services/api.service";
import { getAppOrders } from "../../redux/actions/appAction";

const App = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const appOrders = useSelector((state) => state.adalatApp.app_orders);
  const total = useSelector((state) => state.adalatApp.total);
  const lastPage = useSelector((state) => state.adalatApp.last_page);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const getBySearchTerm = () => {
    try {
      api
        .post("search/adalat_emtp", { search: searchTerm })
        .then((res) => setSearchResult(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const closeSearchResultMenu = () => {
    setSearchResult("");
    setSearchTerm("");
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    dispatch(getAppOrders(page));
  }, [page]);

  return (
    <AppLayout>
      <aside className="bg-white px-5 py-3 rounded-lg flex flex-col lg:flex-row lg:items-center justify-between w-full">
        <div>
          <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
            {t("adalat_emtp")}
          </h1>
          <small>
            {t("total")}: {total}
          </small>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between rounded-lg mt-3 w-full xl:w-6/12">
          <main className="relative flex flex-col w-full">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              className="bg-white w-full px-5 py-2 border rounded-xl z-10"
              placeholder="Gözleg"
              value={searchTerm}
            />
            <button
              onClick={() => getBySearchTerm()}
              className="bg-green-600 hover:bg-green-800 text-white px-3 duration-500 rounded-lg z-10 absolute right-1 mt-1 h-9"
            >
              <IoSearchOutline size={24} />
            </button>
            <aside
              className={`bg-white border ${
                searchResult ? "block" : "hidden"
              } absolute top-1 rounded-xl h-96 w-full`}
            >
              <small className="bg-white text-blue-500 absolute top-8 left-0 px-2 pt-3 pb-1 w-full">
                {searchResult.length > 0
                  ? `Netije: jemi ${searchResult.length}`
                  : "Netije: yok"}
              </small>
              <button
                onClick={() => closeSearchResultMenu()}
                className="w-6 h-6 rounded-full bg-red-500 text-white absolute top-11 right-4 flex items-center justify-center"
              >
                <IoCloseOutline size={20} />
              </button>
              <div className="mt-14 p-3 overflow-y-scroll max-h-80">
                {searchResult &&
                  searchResult.map((result) => {
                    return (
                      <div className="border-b px-2 py-1 my-1">
                        {result.firstname}
                      </div>
                    );
                  })}
              </div>
            </aside>
          </main>
          <NavLink
            className="bg-green-500 hover:bg-green-600 duration-300 text-white px-4 py-2 rounded-lg ml-5"
            to="/apps"
          >
            EMTP
          </NavLink>
        </div>
      </aside>

      {appOrders.length === 0 && <EmptyList message={t("empty_list")} />}

      {appOrders.length > 0 && (
        <main className="overflow-x-auto mb-5">
          <table className="w-full my-3 rounded-lg overflow-hidden">
            <thead className="bg-white border-b text-gray-900 text-left">
              <tr>
                <th className="px-5 py-2"> T/b </th>
                <th className="px-5 py-2"> Sene </th>
                <th className="px-5 py-2"> Töleg amaly </th>
                <th className="px-5 py-2"> Görnüşi </th>
                <th className="px-5 py-2"> Email </th>
                <th className="px-5 py-2"> Ýagdaýy </th>
              </tr>
            </thead>
            <tbody>
              {appOrders.map((appOrder, index) => {
                return (
                  <tr key={index} className="border-b">
                    <td className="bg-white px-5 py-3 my-3 w-24 text-sm">
                      {appOrder.id}
                    </td>
                    <td className="bg-white px-5 py-3 my-3">
                      {appOrder.created_at}
                    </td>
                    <td className="bg-white px-5 py-3 my-3">
                      {appOrder.paid === 1 ? (
                        <IoCheckmarkDoneCircleOutline
                          className="text-green-600"
                          size={32}
                        />
                      ) : (
                        <IoCloseCircleOutline
                          className="text-red-600"
                          size={32}
                        />
                      )}
                    </td>
                    <td className="bg-white px-5 py-3 my-3">
                      {appOrder.person}
                    </td>
                    <td className="bg-white px-5 py-3 my-3">
                      <NavLink
                        to={`/adalat_emtp/${appOrder.id}`}
                        className="text-green-600 mr-2"
                      >
                        {appOrder.email}
                      </NavLink>
                    </td>
                    <td className="bg-white px-5 py-3 my-3">
                      {ReactHtmlParser(appOrder.status)}
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

export default App;
