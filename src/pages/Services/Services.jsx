import AppLayout from "../../layouts/AppLayout"
import EmptyList from "../../components/Empty/EmptyList"
import { IoAddCircleOutline } from "react-icons/io5"

import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadServices } from "../../redux/actions/serviceAction"
import ServiceCard from "./ServiceCard"
import { NavLink } from "react-router-dom"

const Services = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const services = useSelector(state => state.service.services)
    const servicesCount = useSelector(state => state.service.count)


    useEffect(() => {
        dispatch(loadServices())
    }, [])

    return (
        <AppLayout>
            <aside className="bg-white p-3 rounded-lg flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
                        { t('service') }
                    </h1>
                    <small className="flex font-montserrat-medium text-sm text-gray-500">
                        <p>
                            { t('total') }:
                        </p>
                        <p className="ml-2">
                            { servicesCount }
                        </p>
                    </small>
                </div>

                <NavLink
                    to="/service/create"
                    className="bg-white font-montserrat-medium text-green-600 hover:bg-green-600 hover:text-white duration-300 flex items-center px-4 rounded-md py-2 text-md"
                >
                    <IoAddCircleOutline size={24} className="mr-2" /> Täze
                </NavLink>
            </aside>

            {
                services && services.length === 0 && <EmptyList message="Sanaw boş" />
            }

            <main className="grid grid-cols-12 gap-3 lg:gap-10 my-7">
                {
                    services && services.map((service, index) => {
                        return <ServiceCard key={index} service={service} />
                    })
                }
            </main>
        </AppLayout>
    )
}

export default Services
