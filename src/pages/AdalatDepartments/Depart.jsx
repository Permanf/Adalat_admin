
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EmptyList from "../../components/Empty/EmptyList";
import SmallModal from "../../components/Modal/SmallModal";
import AppLayout from "../../layouts/AppLayout";
import { setLoading } from "../../redux/reducers/mainReducer";
import api from "../../services/api.service";
import ClientRemove from "../Clients/ClientRemove";
import AdalatDepartsCard from "./DepartCard";



const LegalActs = () => {
    const { t ,i18n} = useTranslation()
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [total, setTotal] = useState()
    const history = useHistory()
    const fetchData = async () => {
        dispatch(setLoading(true))
        try {
            const response = await api.get('/justice_organizations',{
                params:{locale:i18n.language}
            })
            if (response.status === 200) {
                console.log(response.data.data)
                setData(response.data.data)
                setTotal(response.data.data?.length)
            }
        }
        catch (e) {
            console.log("error")
        }
        dispatch(setLoading(false))

    }

    useEffect(() => {
        fetchData()
      }, [i18n.language])


    ////////////delete
    const [removeModal, setRemoveModal] = useState({
        id: null,
        remove: false,
    });

    const toggleRemoveModal = (id) => {
        setRemoveModal({
            id: id ?? null,
            remove: !removeModal.remove,
        });
    };

    const remove = async(id) => {
        if(id){
            try{
                const response = await api.delete(`justice_organizations/${id}`)
                if (response.status ===200){
                    toast.success('Üstünlikli pozuldy')
                }
            }
            catch(e){
                toast.error('Pozulmady')

            }
        }
        fetchData()

        toggleRemoveModal();
    };

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

                <section>
                    <aside className="bg-white p-3 rounded-lg flex items-center justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
                                {/* {t("legal_acts")} */}
                                Adalat Edaralary
                            </h1>
                            <small className="flex font-montserrat-medium text-sm text-gray-500">
                                <p>{t("total")}:</p>
                                <p className="ml-2">{total}</p>
                            </small>
                        </div>
                        <button
                            onClick={() => {history.push('/adalat-edaralary/add') }}
                            className="bg-white font-montserrat-medium text-green-600 hover:bg-green-600 hover:text-white duration-300 flex items-center px-3 rounded-md py-2 text-sm"
                        >
                            <IoAddCircleOutline size={22} className="mr-2" /> {t("add")}
                        </button>
                    </aside>

                    {data.length === 0 && <EmptyList message={t("empty_list")} />}

                    {data.length > 0 && (
                        <main className="bg-white rounded-xl lg:px-3 my-3 py-2">
                            <table className="w-full align-middle">
                                <thead>
                                    <tr>
                                        <th className="bg-gray-200 text-left px-3 py-2 ">
                                            ID
                                        </th>
                                        <th className="bg-gray-200 text-left px-3 py-2">Edaranyň ady</th>

                                        <th className="bg-gray-200 text-left px-3 py-2">Edaranyň yazgysy</th>
                                        <th className="bg-gray-200 text-right px-3 py-2 rounded-tr-lg rounded-br-lg">
                                            Sazlama
                                        </th>
                                    </tr>
                                </thead>
                                {data.map((item, index) => {
                                    // debugger
                                    return (
                                        <AdalatDepartsCard key={index} index={index} item={item} toggleRemoveModal={toggleRemoveModal} />
                                    );
                                })}
                            </table>
                        </main>
                    )}
                </section>
            </AppLayout>
        </>

    )
}



export default LegalActs