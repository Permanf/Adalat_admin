import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import EmptyList from "../../components/Empty/EmptyList";
import Modal from "../../components/Modal/Modal";
import AppLayout from "../../layouts/AppLayout";
import {
  deleteLaw,
  getLastUpdated,
  loadLaws,
} from "../../redux/actions/lawsAction";
import { setLoading } from "../../redux/reducers/mainReducer";
import LawCard from "./LawCard";
import LawCategoryAdd from "./LawCategoryAdd";
import LawsEdit from "./LawsEdit";
import LawsDelete from "./LawsDelete";
import LawLastUpdatedAdd from "./LawLastUpdatedAdd";
import getByLocale from "../../helpers/getByLocale";
import Literatures from "../Literatures/Literatures";

const Laws = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const laws = useSelector((state) => state.laws.laws);
  const lawsTotal = useSelector((state) => state.laws.total);
  const lastPage = useSelector((state) => state.laws.last_page);
  const [page, setPage] = useState(1);
  const last_updated = useSelector((state) => state.laws.last_updated);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState([]);
  const [editConfirm, setEditConfirm] = useState([]);
  const [lastUpdateModal, setLastUpdateModal] = useState(false);

  const closeAddModal = () => setOpenAddModal(false);

  const closeEditModal = () => editing(false, null);

  const openLastUpdatedModal = () => setLastUpdateModal(true);
  const closeLastUpdatedModal = () => setLastUpdateModal(false);

  const deleting = (confirmation, id) => {
    setDeleteConfirm({ delete: confirmation, id });
  };

  const editing = (confirmation, law) => {
    setEditConfirm({ ...editConfirm, edit: confirmation, law });
  };

  const lawDelete = () => {
    dispatch(deleteLaw(deleteConfirm.id));
    setDeleteConfirm({ delete: false, id: null });
    dispatch(setLoading(true));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(loadLaws(page));
    dispatch(getLastUpdated());
  }, [page]);

  return (
    <>
      <Modal isOpen={openAddModal} close={closeAddModal}>
        <LawCategoryAdd close={closeAddModal} />
      </Modal>

      {editConfirm.edit && (
        <LawsEdit
          editConfirm={editConfirm.edit}
          law={editConfirm.law}
          close={closeEditModal}
        />
      )}
      <LawsDelete
        deleteConfirm={deleteConfirm.delete}
        deleting={deleting}
        lawDelete={lawDelete}
      />

      <LawLastUpdatedAdd
        lastUpdateModal={lastUpdateModal}
        closeLastUpdatedModal={closeLastUpdatedModal}
      />
      <AppLayout>
        <section>
          <aside className="bg-white p-3 rounded-lg flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
                {t("laws")}
              </h1>
              <small className="flex font-montserrat-medium text-sm text-gray-500">
                <p>{t("total")}:</p>
                <p className="ml-2">{lawsTotal}</p>
              </small>
            </div>

            <button
              onClick={() => setOpenAddModal(true)}
              className="bg-white font-montserrat-medium text-green-600 hover:bg-green-600 hover:text-white duration-300 flex items-center px-3 rounded-md py-2 text-sm"
            >
              <IoAddCircleOutline size={22} className="mr-2" /> {t("add")}
            </button>
          </aside>

          <aside className="bg-white p-3 rounded-lg flex flex-col mt-3">
            <div className="flex">
              <h3 className="font-montserrat-bold text-green-500">
                {t("last_updated")}
              </h3>
              <button
                onClick={() => openLastUpdatedModal()}
                className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-3 py-1 text-xs rounded-md mx-3 duration-300"
              >
                {t("edit")}
              </button>
            </div>
            <p className="text-gray-600 mt-2">
              {last_updated ? getByLocale(last_updated) : t("not_last_updated")}
            </p>
          </aside>

          {laws.length === 0 && <EmptyList message={t("empty_list")} />}

          {laws.length > 0 && (
            <main className="bg-white rounded-xl lg:px-3 my-3">
              {laws.map((law, index) => {
                return (
                  <LawCard
                    key={index}
                    law={law}
                    editing={editing}
                    deleting={deleting}
                  />
                );
              })}
            </main>
          )}
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
        <br />
        <Literatures />
      </AppLayout>
    </>
  );
};

export default Laws;
