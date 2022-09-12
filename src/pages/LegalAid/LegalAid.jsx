import AppLayout from "../../layouts/AppLayout";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import api from "../../services/api.service";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import getByLocale from "../../helpers/getByLocale";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import DeleteLegalAid from "./DeleteLegalAid";
import SmallModal from "../../components/Modal/SmallModal";
// import Loader from "../../components/Loader/Loader";
import { isExistLinkOnTitle } from "../../hook/isExistLinkOnTitle";
import LegalAidSkeleton from "./skeleton/LegalAidSkeleton";
import React from 'react'
 const LegalAid = () => {
  const { t, i18n } = useTranslation();
  // const [activeType, setActiveType] = useState('all')
  const [legalAids, setLegalAids] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [fetching, setFetching] = useState(false)
  const [removeModal, setRemoveModal] = useState({
    id: null,
    remove: false,
  });

  const getLegalAids = async (page) => {
    setFetching(true)
    await api
      .get(`legal_aids?page=${page}`, {
        headers: {
          "Accept-Language": i18n.language
        }
      })
   
      .then((res) => {
        setLegalAids(res.data.data);
        setLastPage(res.data.meta.last_page);
        
      })
      .catch((err) => toast.error(t("error_not_loaded"), { duration: 2000 }));
    setFetching(false)

  };

  useEffect(() => {
    getLegalAids(page);
  }, [page,i18n.language]);

  const remove = (legal_aid_id) => {
    api.delete(`legal_aids/${legal_aid_id}`);

    toggleRemoveModal();
    getLegalAids();
  };

  const toggleRemoveModal = (legal_aid_id) => {
    setRemoveModal({
      id: legal_aid_id ?? null,
      remove: !removeModal.remove,
    });
  };

  const setTitle = (title) => {
    const text = title.split('=')[1]
    return text
  }
  return (
    <>
      <SmallModal isOpen={removeModal.remove}>
        <DeleteLegalAid
          id={removeModal.id}
          close={toggleRemoveModal}
          remove={remove}
        />
      </SmallModal>

      <AppLayout>
        <section>
          {fetching ? <LegalAidSkeleton /> :
            <>
              <header className="bg-white px-5 py-3 rounded-lg flex items-center justify-between w-full">
                <div>
                  <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
                    {t("legal_aid")}
                  </h1>
                  <small>
                    {t("total")}: {legalAids.length ?? 0}
                  </small>
                </div>
                <NavLink
                  to="legalaid/add"
                  className="bg-green-500 hover:bg-green-600 text-white duration-300 px-4 py-2 rounded-lg"
                >
                  {t("add")}
                </NavLink>
              </header>
              {/* <aside className="bg-white px-5 py-3 rounded-lg my-5">
                asdasd
              </aside> */}

              <main className="bg-white px-6 py-3 rounded-lg my-5">
                {/* {fetching && <Loader />} */}
                {legalAids.length > 0 &&
                  legalAids.map((legalAid, index) => {
                    return (
                      <aside className="flex items-center justify-between border-b border-gray-300">
                        <NavLink
                          to={`/legalaid/${legalAid.id}`}
                          key={index}
                          className="flex w-full"
                        >
                          <div className="flex flex-col py-2 w-full">
                            <strong>
                              {(isExistLinkOnTitle(legalAid.title)) ?
                                setTitle((legalAid.title)) :
                                t(legalAid.title)
                              }
                            </strong>
                            <small className="text-xs text-green-500">
                              {legalAid.type}
                            </small>
                          </div>
                        </NavLink>
                        <div className="flex">
                          <NavLink
                            to={`/legalaid/${legalAid.id}/edit`}
                            className="border border-blue-400 hover:bg-blue-500 text-blue-500 hover:text-white text-xs duration-300 px-2 py-1 rounded-md mr-2"
                          >
                            <IoPencilOutline size={20} />
                          </NavLink>
                          <button
                            onClick={() => toggleRemoveModal(legalAid.id)}
                            className="border border-red-400 hover:bg-red-500 text-red-500 hover:text-white text-xs duration-300 px-2 py-1 rounded-md"
                          >
                            <IoTrashOutline size={20} />
                          </button>
                        </div>
                      </aside>
                    );
                  })}
              </main>
            </>}
          {lastPage > 1 && (
            <ReactPaginate
              previousClassName={"hidden"}
              nextClassName={"hidden"}
              breakLabel={"..."}
              breakClassName={
                "bg-white border-gray-300 text-gray-500 hover:bg-gray-200 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm"
              }
              pageCount={lastPage}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={(data) => setPage(data.selected + 1)}
              pageClassName={
                "bg-white border-gray-300 text-gray-500 hover:bg-gray-200 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm"
              }
              containerClassName={
                "relative z-0 inline-flex justify-center rounded-md mb-16 w-full"
              }
              activeClassName={"bg-gray-200"}
            />
          )}
        </section>
      </AppLayout>
    </>
  );
};

export default React.memo(LegalAid);
