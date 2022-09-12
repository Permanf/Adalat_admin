import AppLayout from "../../layouts/AppLayout";
import EmptyList from "../../components/Empty/EmptyList";
import { IoAddCircleOutline } from "react-icons/io5";

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadNews } from "../../redux/actions/newsAction";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import NewsCard from "./Views/NewsCard";

const News = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const newsTotal = useSelector((state) => state.news.total);
  const lastPage = useSelector((state) => state.news.last_page);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch(loadNews(page));
  }, [page]);

  return (
    <AppLayout>
      <aside className="bg-white p-3 rounded-lg flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
            {t("news")}
          </h1>
          <small className="flex font-montserrat-medium text-sm text-gray-500">
            <p>{t("total")}:</p>
            <p className="ml-2">{newsTotal}</p>
          </small>
        </div>

        <NavLink
          to="/news/create"
          className="bg-white font-montserrat-medium text-green-600 hover:bg-green-600 hover:text-white duration-300 flex items-center px-4 rounded-md py-2 text-md"
        >
          <IoAddCircleOutline size={24} className="mr-2" /> Paýlaş
        </NavLink>
      </aside>

      {news.length === 0 && <EmptyList message={t("empty_list")} />}

      <main className="grid grid-cols-12 gap-3 lg:gap-10 my-7">
        {news &&
          news.map((news, index) => {
            return <NewsCard key={index} news={news} />;
          })}
      </main>

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

export default News;
