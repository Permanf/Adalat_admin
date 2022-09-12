import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import EmptyList from "../../components/Empty/EmptyList";
import AppLayout from "../../layouts/AppLayout";
import { deleteLawyer, loadLawyers } from "../../redux/actions/lawyerAction";
import LawyerCard from "./LawyerCard";
import SmallModal from "../../components/Modal/SmallModal";
import { setLoading } from "../../redux/reducers/mainReducer";

const Lawyers = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const lawyers = useSelector((state) => state.lawyer.lawyers);
  const total = useSelector((state) => state.lawyer.total);
  const lastPage = useSelector((state) => state.lawyer.last_page);
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState([]);

  const deleting = (confirmation, id) => {
    setDeleteConfirm({ delete: confirmation, id });
  };

  const lawyerDelete = () => {
    dispatch(deleteLawyer(deleteConfirm.id));
    setDeleteConfirm({ delete: false, id: null });
    dispatch(setLoading(true));
  };

  useEffect(() => {
    dispatch(loadLawyers(page));
  }, [page]);

  return (
    <>
      {deleteConfirm.delete && (
        <SmallModal isOpen={deleteConfirm.delete}>
          <aside className="flex flex-col items-center justify-center">
            <h1 className="font-montserrat-bold text-xl">
              {" "}
              {t("confirm_delete")}{" "}
            </h1>

            <div className="flex mt-3">
              <button
                onClick={() => lawyerDelete()}
                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 rounded-lg px-6 py-2 my-2 mr-4"
              >
                {t("yes")}
              </button>

              <button
                onClick={() => deleting(false, null)}
                className="bg-gray-100 text-gray-800 duration-300 rounded-lg px-6 py-2 my-2"
              >
                {t("no")}
              </button>
            </div>
          </aside>
        </SmallModal>
      )}
      <AppLayout>
        <aside className="bg-white p-3 rounded-lg flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
              {t("lawyers")}
            </h1>
            <small className="flex font-montserrat-medium text-sm text-gray-500">
              <p>{t("total")}:</p>
              <p className="ml-2">{total}</p>
            </small>
          </div>

          <NavLink
            to="/lawyer/add/"
            className="bg-white font-montserrat-medium text-green-600 hover:bg-green-600 hover:text-white duration-300 flex items-center px-4 rounded-md py-2 text-md"
          >
            <IoAddCircleOutline size={24} className="mr-2" /> {t("add")}
          </NavLink>
        </aside>

        {lawyers && lawyers.length === 0 && (
          <EmptyList message={t("empty_list")} />
        )}

        {lawyers && lawyers.length > 0 && (
          <main className="grid grid-cols-12 gap-5 my-5">
            {lawyers.map((lawyer, key) => {
              return (
                <LawyerCard key={key} lawyer={lawyer} deleting={deleting} />
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
    </>
  );
};
export default Lawyers;
