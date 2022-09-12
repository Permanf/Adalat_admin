import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
// import ReactPaginate from "react-paginate";
import EmptyList from "../../components/Empty/EmptyList";
// import Modal from "../../components/Modal/Modal";
// import AppLayout from "../../layouts/AppLayout";

import { setLoading } from "../../redux/reducers/mainReducer";
import LiteratureCard from "./LiteratureCard";
import api from "../../services/api.service";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";


const Literatures = () => {
  const { t ,i18n} = useTranslation();
  const [literatures, setLiteratures] = useState([])
  const [literaturesTotal, setliteraturesTotal] = useState(0)
  const dispatch = useDispatch();
  const history = useHistory()


  const fetchData = async () => {
    dispatch(setLoading(true))
    try {
      const response = await api.get('/law-literatures',{
        params:{
          locale:i18n.language
        }
      })
      if (response.status === 200) {
        setLiteratures(response.data.data)
        setliteraturesTotal(response.data.meta.total)
      }
    }
    catch (e) {

    }
    dispatch(setLoading(false))
  }
  const deleteItem = async(id)=>{
    dispatch(setLoading(true))
    try {
      const response = await api.post(`/law-literature/delete/${id}`)
      if (response.status === 200) {
        toast.success('Üstünliklli pozuldy')
        fetchData()
      }
    }
    catch (e) {
      toast.error('Pozulmady')

    }
    dispatch(setLoading(false))
  } 

  
  useEffect(() => {
    fetchData()
  }, [i18n.language])

  return (
    <>

      {/* <AppLayout> */}
      <section>
        <aside className="bg-white p-3 rounded-lg flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
              {t("literature")}
            </h1>
            <small className="flex font-montserrat-medium text-sm text-gray-500">
              <p>{t("total")}:</p>
              <p className="ml-2">{literaturesTotal}</p>
            </small>
          </div>

          <button
            onClick={() => {history.push('/literature/add')}}
            className="bg-white font-montserrat-medium text-green-600 hover:bg-green-600 hover:text-white duration-300 flex items-center px-3 rounded-md py-2 text-sm"
          >
            <IoAddCircleOutline size={22} className="mr-2" /> {t("add")}
          </button>
        </aside>



        {literatures.length === 0 && <EmptyList message={t("empty_list")} />}

        {literatures.length > 0 && (
          <main className="bg-white rounded-xl lg:px-3 my-3">
            {literatures.map((literature, index) => {
              // debugger
              return (
                <LiteratureCard
                  key={index}
                  literature={literature}
                  deleteItem={deleteItem}
                />
              );
            })}
          </main>
        )}
      </section>

      {/* {lastPage > 1 && (
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
        )} */}
      {/* </AppLayout> */}
    </>
  );
};

export default Literatures;
