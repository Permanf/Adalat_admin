import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import EmptyList from "../../components/Empty/EmptyList";
import SmallModal from "../../components/Modal/SmallModal";
import AppLayout from "../../layouts/AppLayout";
import { deleteBanner, loadBanners } from "../../redux/actions/bannerAction";
import { setLoading } from "../../redux/reducers/mainReducer";

const Banners = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const banners = useSelector((state) => state.banner.banners);
  const total = useSelector((state) => state.banner.total);
  const lastPage = useSelector((state) => state.banner.last_page);
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState([]);

  const closeDeleteModal = () => deleting(false, null);

  const deleting = (confirmation, id) => {
    setDeleteConfirm({ ...deleteConfirm, delete: confirmation, id });
  };

  const bannerDelete = () => {
    dispatch(deleteBanner(deleteConfirm.id));
    setDeleteConfirm({ ...deleteConfirm, delete: false, id: null });
    dispatch(setLoading(true));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    dispatch(loadBanners(page));
  }, [page]);

  return (
    <>
      {deleteConfirm.delete && (
        <SmallModal isOpen={deleteConfirm.delete} close={closeDeleteModal}>
          <aside className="flex flex-col items-center justify-center">
            <h1 className="font-montserrat-bold text-xl">
              {" "}
              {t("confirm_delete")}{" "}
            </h1>

            <div className="flex mt-5">
              <button
                onClick={() => bannerDelete()}
                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 rounded-lg px-6 py-2 my-2 mr-4"
              >
                {t("yes")}
              </button>

              <button
                onClick={() => closeDeleteModal()}
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
              {t("banners")}
            </h1>
            <small className="flex font-montserrat-medium text-sm text-gray-500">
              <p>{t("total")}:</p>
              <p className="ml-2">{total}</p>
            </small>
          </div>

          <NavLink
            to="/banner/add"
            className="bg-white font-montserrat-medium text-green-600 hover:bg-green-600 hover:text-white duration-300 flex items-center px-4 rounded-md py-2 text-md"
          >
            <IoAddCircleOutline size={24} className="mr-2" /> {t("add")}
          </NavLink>
        </aside>

        {banners && banners.length === 0 && (
          <EmptyList message={t("empty_list")} />
        )}

        {banners && banners.length > 0 && (
          <main className="grid grid-cols-12 gap-5 bg-white shadow-gray-sm p-5 rounded-xl my-7">
            {banners.map((banner, key) => {
              return (
                <aside
                  key={key}
                  className="col-span-12 lg:col-span-6 overflow-hidden border rounded-xl"
                >
                  <img
                    src={banner.image}
                    alt="Banner"
                    className="w-full rounded-xl"
                  />
                  <div className="flex items-center justify-between mt-3 p-3">
                    <div className="flex flex-col text-sm">
                      <p> ID: {banner.id} </p>
                      <p> Sene: {banner.created_at} </p>
                    </div>
                    <button
                      onClick={() => deleting(true, banner.id)}
                      className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-xs rounded-full w-10 h-10 flex items-center justify-center"
                    >
                      <IoTrashOutline size={22} />
                    </button>
                  </div>
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
    </>
  );
};

export default Banners;
