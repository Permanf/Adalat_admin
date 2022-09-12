import { useTranslation } from "react-i18next"
import { IoAddCircleOutline } from "react-icons/io5"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import ReactPaginate from 'react-paginate'
import AppLayout from "../../layouts/AppLayout"
import { useDispatch, useSelector } from "react-redux"
import { loadSites, deleteConfirm, deleteSite } from "../../redux/actions/siteAction"
import SiteCard from "./SiteCard"
import SmallModal from "../../components/Modal/SmallModal"
import EmptyList from "../../components/Empty/EmptyList"
import { setLoading } from "../../redux/reducers/mainReducer"

const Sites = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const sites = useSelector(state => state.site.sites)
    const siteTotal = useSelector(state => state.site.total)
    const lastPage = useSelector(state => state.site.last_page)
    const [page, setPage] = useState(1)
    const deleteConfirmation = useSelector(state => state.site.deleteConfirmation)
    const deleteID = useSelector(state => state.site.deleteID)
    const deleteClose = {
        id: null,
        confirm: false
    }

    const onDelete = () => {
        dispatch(deleteSite(deleteID))
        dispatch(deleteConfirm(deleteClose))
        dispatch(setLoading(true))
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        dispatch(loadSites(page))
    }, [page])

    return (
        <>
            {
                deleteConfirmation &&
                <SmallModal isOpen={true}>
                    <h1 className="text-2xl font-montserrat-bold"> Pozmagy tassyklaň </h1>
                    <aside className="flex items-center justify-center mt-5">
                        <button
                            onClick={() => onDelete()}
                            className="bg-white text-red-700 border border-red-700 hover:bg-red-700 hover:text-white duration-300 font-bold rounded-lg px-4 py-2 mr-2"
                        >
                            { t('yes') }
                        </button>
                        <button
                            onClick={() => dispatch(deleteConfirm(deleteClose))}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 font-bold duration-300 border border-gray-200 rounded-lg px-4 py-2">
                            { t('no') }
                        </button>
                    </aside>
                </SmallModal>
            }
            <AppLayout>
                <section className="font-montserrat-medium">
                    <aside className="bg-white p-3 rounded-lg flex items-center justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
                                { t('sites') }
                            </h1>
                            <small className="flex font-montserrat-medium text-sm text-gray-500">
                                <p>
                                    { t('total') }:
                                </p>
                                <p className="ml-2">
                                    { siteTotal }
                                </p>
                            </small>
                        </div>

                        <NavLink
                            to="/site/add"    
                            className="bg-white font-montserrat-medium text-green-600 hover:bg-green-600 hover:text-white duration-300 flex items-center px-4 rounded-md py-2 text-md"
                        >
                            <IoAddCircleOutline size={24} className="mr-2" /> { t('add') }
                        </NavLink>
                    </aside>

                    <main className="grid grid-cols-12 gap-5 my-5">
                        {
                            sites && sites.length === 0 &&
                            <div className="col-span-12 -mt-5">
                                <EmptyList message="Sanaw boş"/>
                            </div>
                        }
                        {
                            sites && sites.map((site, index) => {
                                return (
                                    <SiteCard key={index} site={site}/>
                                )
                            })
                        }
                    </main>

                    {
                        lastPage > 1 &&
                        <ReactPaginate
                            previousClassName={'hidden'}
                            nextClassName={'hidden'}
                            breakLabel={'...'}
                            breakClassName={'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm'}
                            pageCount={lastPage}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={3}
                            onPageChange={(data) => setPage(data.selected+1)}
                            pageClassName={'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm'}
                            containerClassName={'relative z-0 inline-flex justify-center rounded-md mb-16 w-full'}
                            activeClassName={'bg-gray-100'}
                        />
                    }

                </section>
            </AppLayout>
        </>
    )
}

export default Sites