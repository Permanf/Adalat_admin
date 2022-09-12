import AppLayout from "../../layouts/AppLayout"

import { NavLink, Redirect, useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import api from "../../services/api.service"
import SmallModal from "../../components/Modal/SmallModal"
import ServiceDelete from "./ServiceDelete"
import { useTranslation } from "react-i18next"
import { IoPencilOutline, IoTimeOutline, IoTrashOutline } from "react-icons/io5"
import { removeService } from "../../redux/actions/serviceAction"
import { useDispatch } from "react-redux"
import getByLocale from "../../helpers/getByLocale"
import ReactHtmlParser from 'react-html-parser'

const ServiceShow = () => {
    const { i18n } = useTranslation()
    const { id } = useParams()
    const dispatch = useDispatch()
    const [service, setService] = useState(null)
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const modalClose = () => {
        setOpen(false)
    }

    const deleteService = () => {
        dispatch(removeService(id))
    }

    useEffect(() => {
        api.get(`service/${id}`).then(res => setService(res.data.data))
    }, [])

    return (
        <>
            <SmallModal isOpen={open} close={modalClose}>
                <ServiceDelete delete={deleteService} close={modalClose}/>
            </SmallModal>
            <AppLayout>
                {
                    redirect && <Redirect to="/services" />
                }

                {
                    service &&
                    <section className="bg-white shadow-gray rounded-lg mb-10">
                        <main className="p-4">
                            <img className="w-full rounded-lg mb-4" src={service.image} alt={ getByLocale(service.title) } />
                            <small className="flex items-center text-base text-gray-600 mb-2">
                                <IoTimeOutline className="mr-2" size={22} /> { service.date }
                            </small>

                            <aside className="flex items-center">
                                <NavLink
                                    to={`/service/${id}/edit`}
                                    className="flex bg-white hover:bg-blue-600 border border-blue-600 text-blue-600 hover:text-white px-3 py-1 text-sm duration-300 rounded-md my-2"
                                >
                                    <IoPencilOutline size={22} className="mr-2" /> Uytget
                                </NavLink>
                                
                                <button
                                    onClick={() => setOpen(true)}
                                    className="flex bg-white hover:bg-red-600 border border-red-600 text-red-600 hover:text-white px-3 py-1 text-sm duration-300 rounded-md my-2 ml-4"
                                >
                                <IoTrashOutline size={22} className="mr-2" /> Poz
                                </button>
                            </aside>

                            <article className="my-3">
                                <h1 className="text-lg lg:text-2xl font-bold font-montserrat-bold text-gray-700 mb-3"> { getByLocale(service.title) } </h1>
                                <p className="text-gray-600"> { ReactHtmlParser(getByLocale(service.text)) } </p>
                            </article>
                        </main>
                    </section>
                }
            </AppLayout>
        </>
    )
}

export default ServiceShow
