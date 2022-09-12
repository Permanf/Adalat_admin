import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import EmptyList from "../../components/Empty/EmptyList";
import AppLayout from "../../layouts/AppLayout";
import { getClients, removeClient } from "../../redux/actions/clientAction";
import ClientRemove from "./ClientRemove";
import SmallModal from "../../components/Modal/SmallModal";
import {
  IoArrowUndoOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoSearchOutline
} from "react-icons/io5";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import api from "../../services/api.service";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { getShortDate } from "../../hook/getShortDate";

const Clients = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const clients = useSelector((state) => state.client.clients);
  const clientTotal = useSelector((state) => state.client.total);
  const lastPage = useSelector((state) => state.client.last_page);
  const [fetching, setIsFetching] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDates, setFilterDates] = useState([
    null, new Date()
  ])
  const [page, setPage] = useState(1);
  const [activeData, setActiveData] = useState(0)
  const clientsData = {
    data: clients,
    total: clientTotal,
    lastPage: lastPage
  }
  const [searchResult, setSearchResult] = useState({
    data: [],
    total: 0,
    lastPage: 0
  })
  const [filterResult, setFilterResult] = useState({
    data: [],
    total: 0,
    lastPage: 0
  })
  const data = [clientsData, searchResult, filterResult]
  const [removeModal, setRemoveModal] = useState({
    id: null,
    remove: false,
  });

  const remove = (client_id) => {
    dispatch(removeClient(client_id));
    toggleRemoveModal();
  };

  const toggleRemoveModal = (client_id) => {
    setRemoveModal({
      id: client_id ?? null,
      remove: !removeModal.remove,
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (activeData === 0) {
      dispatch(getClients(page));
    }
  }, [page]);

  const getBySearchTerm = async () => {
    if (searchTerm.length > 0) {
      setIsFetching(true)
      try {
        setPage(1)
        await api.get('/client', {
          params: {
            page: 1,
            search: searchTerm,
          }
        }).then((res) => {
          if (res.status === 200) {
            if (res.data.data && res.data.data?.length === 0) {
              toast.error('Tapylmady')
            }
            setSearchResult({
              data: res.data.data ? res.data.data : [],
              lastPage: res.data.meta.last_page ? res.data.meta.last_page : 0,
              total: res.data.meta.total ? res.data.meta.total : 0
            })
          }
        })
        setActiveData(1)
      }
      catch (e) {

      }
      setIsFetching(false)
    }
  }

  const getByFiltered = async () => {
    if (filterDates?.[0] && filterDates?.[1]) {

      setIsFetching(true)
      try {
        setPage(1)
        await api.get('/client', {
          params: {
            dates: getShortDate(filterDates[0]) + ',' + getShortDate(filterDates[1])
          }
        }).then((res) => {
          if (res.status === 200) {
            if (res.data.data && res.data.data?.length === 0) {
              toast.error('Tapylmady')
            }
            setFilterResult({
              data: res.data.data ? res.data.data : [],
              lastPage: res.data.meta.last_page ? res.data.meta.last_page : 0,
              total: res.data.meta.total ? res.data.meta.total : 0
            })
          }
        })
        setActiveData(2)
      }
      catch (e) {
        console.log(e)
        toast.error('Tapylmady')
      }
      setIsFetching(false)
    }


  }






  useEffect(() => {
    if (searchTerm.length < 1) {
      setActiveData(0)
    }
    if(!filterDates?.[0]||!filterDates?.[1]){
      setActiveData(0)
    }

  }, [searchTerm,filterDates])

  

  return (
    <>
      <SmallModal isOpen={removeModal.remove}>
        <ClientRemove
          id={removeModal.id}
          close={toggleRemoveModal}
          remove={remove}
        />
      </SmallModal>

      <AppLayout>
        <header className="bg-white p-3 rounded-lg flex items-center">
          <button
            onClick={() => history.goBack()}
            className="flex items-center justify-center bg-gray-200 text-gray-700 w-10 h-10 rounded-full"
          >
            <IoArrowUndoOutline size={24} />
          </button>
          <div className="flex flex-col ml-3">
            <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
              {t("clients")}
            </h1>
            <small className="flex font-montserrat-medium text-sm text-gray-500">
              <p>{t("total")}:</p>
              <p className="ml-2">{clientTotal}</p>
            </small>
          </div>
        </header>

        <aside className="flex flex-col-3 gap-4 lg:flex-row lg:items-center bg-white px-5 py-3 rounded-lg mt-3">
          <div className="relative flex flex-col w-full lg:w-4/12">
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

          </div>
          <div className="flex items-center border rounded-xl px-2">
            <DateRangePicker
              className="rounded-xl"
              calendarClassName="my-5 rounded-xl overflow-hidden"
              onChange={setFilterDates}
              value={filterDates}
              format="dd-MM-y"
              dayPlaceholder="gun"
              monthPlaceholder="ay"
              yearPlaceholder="yyl"
            />
            <button
              onClick={() => getByFiltered()}
              className="bg-green-600 hover:bg-green-800 text-white px-3 duration-500 rounded-lg z-10 h-9"
            >
              <IoSearchOutline size={24} />
            </button>
          </div>
        </aside>
        {fetching && <div className="text-center pt-3">
          <PulseLoader color="green" />
        </div>}
        {data[activeData].data.length === 0 && <EmptyList message={t("empty_list")} />}

        {data[activeData].data.length > 0 && (
          <main className="bg-white p-5 my-5 rounded-lg mx-auto overflow-x-auto">
            <table className="w-full align-middle">
              <thead>
                <tr>
                  <th className="bg-gray-200 text-left px-3 py-2 rounded-tl-lg rounded-bl-lg">
                    N
                  </th>
                  <th className="bg-gray-200 text-left px-3 py-2 ">
                    ID
                  </th>
                  <th className="bg-gray-200 text-left px-3 py-2">A.A.F</th>
                  <th className="bg-gray-200 text-left px-3 py-2">Email</th>
                  <th className="bg-gray-200 text-left px-3 py-2">
                    Telefon belgisi
                  </th>
                  <th className="bg-gray-200 text-left px-3 py-2">Sene</th>
                  <th className="bg-gray-200 text-left px-3 py-2 rounded-tr-lg rounded-br-lg">
                    Sazlama
                  </th>
                </tr>
              </thead>

              <tbody>
                {data[activeData].data.map((client, index) => {
                  return (
                    <tr className="border-b border-gray-300" key={index}>
                      <td className="p-3">
                        <small>{(index + 1) + ((page - 1) * (clients.length))}</small>
                      </td>
                      <td className="p-3">
                        <small>{client.id}</small>
                      </td>
                      <td className="p-3">
                        <p className="text-gray-700">{client.fullname}</p>
                      </td>
                      <td className="p-3">
                        <p className="text-gray-700">{client.email}</p>
                        {client.email_confirmed ? (
                          <small className="text-green-500">
                            {t("confirmed")}
                          </small>
                        ) : (
                          <small className="text-red-500">
                            {t("not_confirmed")}
                          </small>
                        )}
                      </td>
                      <td className="p-3">
                        <p className="text-gray-700">{client.phone}</p>
                        {client.phone_confirmed ? (
                          <small className="text-green-500">
                            {t("confirmed")}
                          </small>
                        ) : (
                          <small className="text-red-500">
                            {t("not_confirmed")}
                          </small>
                        )}
                      </td>
                      <td className="p-3">
                        <p className="text-gray-700">{client.created_at}</p>
                      </td>
                      <td className="p-3">
                        <div className="flex">
                          <NavLink
                            to={`/client/${client.id}/edit`}
                            className="border border-blue-400 hover:bg-blue-500 text-blue-500 hover:text-white text-xs duration-300 px-2 py-1 rounded-md mr-2"
                          >
                            <IoPencilOutline size={20} />
                          </NavLink>
                          <button
                            onClick={() => toggleRemoveModal(client.id)}
                            className="border border-red-400 hover:bg-red-500 text-red-500 hover:text-white text-xs duration-300 px-2 py-1 rounded-md"
                          >
                            <IoTrashOutline size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </main>
        )}

        {data[activeData].lastPage > 1 && (
          <ReactPaginate
            previousClassName={"hidden"}
            nextClassName={"hidden"}
            breakLabel={"..."}
            breakClassName={
              "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm"
            }
            pageCount={data[activeData].lastPage}
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

export default Clients;
