import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import EmptyList from "../../components/Empty/EmptyList";
import ReactPaginate from "react-paginate";
import AppLayout from "../../layouts/AppLayout";
import { IoArchiveOutline, IoArrowUndoOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { getArchives } from "../../redux/actions/archiveAction";

const Archives = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const archives = useSelector((state) => state.archive.archives);
  const total = useSelector((state) => state.archive.total);
  const lastPage = useSelector((state) => state.archive.last_page);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    dispatch(getArchives(page));
  }, [page]);

  return (
    <AppLayout>
      <aside className="bg-white px-5 py-3 rounded-lg flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => history.goBack()}
            className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full"
          >
            <IoArrowUndoOutline size={24} />
          </button>
          <div className="flex flex-col ml-4">
            <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
              {t("archives")}
            </h1>
            <small>
              {t("total")}: {total}
            </small>
          </div>
        </div>
      </aside>

      {archives.length === 0 && <EmptyList message={t("empty_list")} />}

      {archives.length > 0 && (
        <main>
          {archives.map((archive, index) => {
            return (
              <aside key={index} className="bg-white px-5 py-3 my-2">
                <div className="flex">
                  <IoArchiveOutline size={24} />
                  <p className="mx-2"> {archive.name} </p>
                </div>
                <small>{archive.created_at}</small>
              </aside>
            );
          })}
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

export default Archives;
