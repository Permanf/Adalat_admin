import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import EmptyList from "../../components/Empty/EmptyList";
import ReactPaginate from "react-paginate";
import AppLayout from "../../layouts/AppLayout";
import { getQuestions } from "../../redux/actions/questionAction";
import {

  IoFilterOutline,
  IoKeyOutline,
  IoMailOutline,
  IoSearchOutline,
  IoTimeOutline,
  IoTrashOutline,
  IoCloudDownloadOutline
} from "react-icons/io5";
import { NavLink } from "react-router-dom";
import api from "../../services/api.service";
import toast from "react-hot-toast";
import MiniLoader from '../../components/Loader/MiniLoader'
import { PulseLoader } from "react-spinners";
import SmallModal from "../../components/Modal/SmallModal";
import ClientRemove from "../Clients/ClientRemove";



const Questions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false)
  const [fetchingSearch, setFetchingSearch] = useState(false)

  const questions = useSelector((state) => state.question.questions);
  const total = useSelector((state) => state.question.total);
  const lastPage = useSelector((state) => state.question.last_page);
  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState("");


  const [showRemoveModal, setShowRemoveModal] = useState({
    isOpen: false,
    itemId: null
  })
  const getBySearchTerm = async () => {
    setFetchingSearch(true)
    try {
      await api
        .post("/search/questions", { search: searchTerm })
        .then((res) => {
          setSearchResult(res.data.data)
          if(res.data?.data?.length<1){
            toast.error('Gözleg boýunça tapylmady')
          }
        });
    } catch (err) {
      console.log(err);
    }
    setFetchingSearch(false)
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

    dispatch(getQuestions(page));
  }, [page]);

  useEffect(() => {
    if (!searchTerm && searchTerm.length < 1) {
      setSearchResult([])
    }

  }, [searchTerm])

  const deleteItem = async (id) => {
    setFetching(true)
    try {
      await api.delete(`question/${id}`).then((res) => {
        if (res.status === 200) {
          setShowRemoveModal({
            isOpen: false,
            itemId: null
          })
          toast.success('Ustunlikli pozuldy', { duration: 2000 })
          dispatch(getQuestions(page));

        }
      })
    }
    catch (e) {
      console.log(e)
    }
    setFetching(false)
  }
  return (<>
    <SmallModal isOpen={showRemoveModal.isOpen}>
      <ClientRemove id={showRemoveModal.itemId} remove={deleteItem} close={() => {
        setShowRemoveModal({
          isOpen: false,
          itemId: null
        })
      }} />
    </SmallModal>
    <AppLayout>
      
      {fetching ? <div className="text-center py-10"><MiniLoader /></div> : <>
        <aside className="bg-white px-5 py-3 rounded-lg flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
              {t("questions")}
            </h1>
            <small>
              {t("total")}: {total}
            </small>
          </div>
          <div className="flex">
            <NavLink
              to="/passwords"
              data-tip="Açarsözler sanawy"
              className="border border-green-600 hover:border-green-500 hover:bg-green-500 hover:text-white text-green-500 duration-300 p-2 rounded-lg mr-1"
            >
              <IoKeyOutline size={24} />
            </NavLink>

            <NavLink
              to="/archives"
              data-tip="Arhiwlar sanawy"
              className="border border-green-600 hover:border-green-500 hover:bg-green-500 hover:text-white text-green-500 duration-300 p-2 rounded-lg ml-2"
            >
              <IoTimeOutline size={24} />
            </NavLink>
          </div>
        </aside>

        <aside className="flex flex-col lg:flex-row lg:items-center justify-between bg-white px-5 py-3 rounded-lg mt-3">
          <main className="relative flex flex-col w-full lg:w-4/12">

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

          </main>


          <div className="relative bg-white border rounded-lg overflow-hidden mt-3 lg:mt-0">
            <button className="text-green-600 px-3 rounded-lg absolute left-1 top-1 bottom-1">
              <IoFilterOutline size={24} />
            </button>
            <select className="bg-white text-green-600 w-full appearance-none ml-8 px-5 py-2.5 text-sm">
              <option value="name"> Ady boýunça </option>
              <option value="address"> Salgysy boýunça </option>
              <option value="date"> Senesi boýunça </option>
            </select>
          </div>
        </aside>
        {fetchingSearch && <div className="text-center pt-3">
          <PulseLoader color="green" />
        </div>}

        {questions.length === 0 && <EmptyList message={t("empty_list")} />}

        {questions.length > 0 && (
          <main>
            <table className="w-full my-3  rounded-lg overflow-hidden">
              <thead className="bg-white border-b text-gray-900 text-left">
                <tr>
                  <th className="px-5 py-2">N</th>
                  <th className="px-5 py-2"> F.A.A </th>
                  <th className="px-5 py-2"> Sene </th>
                  <th className="px-5 py-2 text-center"> Sazlama </th>

                </tr>
              </thead>
              <tbody>{
                (searchResult && searchResult.length > 0) ? searchResult.map((question, index) => {
                  // debugger
                  return (
                    <tr key={index} className="border-b">
                      <td className="bg-white px-5 py-3 my-3">{index + 1}</td>
                      <td className="bg-white px-5 py-3 my-3">
                        <NavLink
                          to={`/question/${question.id}`}
                          className="text-green-600 mr-2"
                        >
                          {question.fullname}
                        </NavLink>
                      </td>
                      <td className="bg-white px-5 py-3 my-3">
                        {question.created_at}
                      </td>
                      <td className="bg-white px-5 py-3 my-3 text-center">
                        <div className="flex items-center justify-center">

                          <button
                            onClick={() => { setShowRemoveModal({ isOpen: true, itemId: question?.id }) }}
                            className="border border-red-400 hover:bg-red-500 text-red-500 hover:text-white text-xs duration-300 px-2 py-1 rounded-md mr-2"
                          >
                            <IoTrashOutline size={20} />
                          </button>
                          <a href={`mailto:${question?.email}?Subject = Ýüztutma jogap`} className='border-green-400 hover:bg-green-500 text-green-500 hover:text-white duration-300 px-2 py-1 rounded-md border inline-block text-xl'>
                            <IoMailOutline />
                          </a>
                        </div>
                      </td>

                    </tr>
                  )
                }) : <>
                  {questions.map((question, index) => {
                    // debugger
                    return (
                      <tr key={index} className="border-b">
                        <td className="bg-white px-5 py-3 my-3">{(index + 1) + ((page - 1) * (questions.length))}</td>
                        <td className="bg-white px-5 py-3 my-3">
                          <NavLink
                            to={`/question/${question.id}`}
                            className="text-green-600 mr-2"
                          >
                            {question.fullname}
                          </NavLink>
                        </td>
                        <td className="bg-white px-5 py-3 my-3">
                          {question.created_at}
                        </td>
                        <td className="bg-white px-5 py-3 my-3 text-center">
                          <div className="flex items-center justify-center">

                            <button
                              onClick={() => { setShowRemoveModal({ isOpen: true, itemId: question?.id }) }}
                              className="border border-red-400 hover:bg-red-500 text-red-500 hover:text-white text-xs duration-300 px-2 py-1 rounded-md mr-2"
                            >
                              <IoTrashOutline size={20} />
                            </button>
                            <a href={`mailto:${question?.email}?Subject = Ýüztutma jogap`} className='border-green-400 hover:bg-green-500 text-green-500 hover:text-white duration-300 px-2 py-1 rounded-md border inline-block text-xl mr-2'>
                              <IoMailOutline />
                            </a>
                            <a href={question?.archive?.file} className='border-blue-400 hover:bg-blue-500 text-blue-500 hover:text-white duration-300 px-2 py-1 rounded-md border inline-block text-xl'>
                              <IoCloudDownloadOutline />
                            </a>
                          </div>
                        </td>

                      </tr>
                    );
                  })}</>}
              </tbody>
            </table>
          </main>
        )}
        {
          (searchTerm.length < 1 && lastPage > 1) && (
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
          )}</>}
    </AppLayout>
  </>
  );
};

export default Questions;
