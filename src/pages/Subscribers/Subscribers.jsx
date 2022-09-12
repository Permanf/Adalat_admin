import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import EmptyList from "../../components/Empty/EmptyList";
import AppLayout from "../../layouts/AppLayout";
import { getSubscribers } from "../../redux/actions/subscribeAction";
import SubscribeCard from "./SubscribeCard";

const Subscribers = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const subscribers = useSelector((state) => state.subscribe.subscribers);
  const subscribeTotal = useSelector((state) => state.subscribe.total);
  const lastPage = useSelector((state) => state.subscribe.last_page);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    dispatch(getSubscribers(page));
  }, [page]);

  return (
    <AppLayout>
      <aside className="bg-white p-3 rounded-lg flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
            {t("subscribers")}
          </h1>
          <small className="flex font-montserrat-medium text-sm text-gray-500">
            <p>{t("total")}:</p>
            <p className="ml-2">{subscribeTotal}</p>
          </small>
        </div>
      </aside>

      {subscribers.length > 0 && (
        <main className="bg-white px-4 py-3 my-5 rounded-lg">
          {subscribers.map((subscriber, index) => {
            return <SubscribeCard key={index} subscriber={subscriber} />;
          })}
        </main>
      )}

      {subscribers.length === 0 && <EmptyList message={t("empty_list")} />}

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
export default Subscribers;
