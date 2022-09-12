import { IoTimeOutline } from "react-icons/io5"
import { NavLink } from "react-router-dom"
import cutText from "../../helpers/cutText"
import getByLocale from "../../helpers/getByLocale"

const ServiceCard = ({service}) => {
    const locale = localStorage.getItem('locale')

    return (
        <NavLink
            to={`service/${service.id}`}
            className="relative col-span-12 lg:col-span-6 rounded-2xl overflow-hidden"
        >
            <img className="w-full h-full object-cover rounded-2xl bg-gray-100" src={service.image_mini} alt={getByLocale(service.title)} />
            <div className="bg-green-600 text-white bg-opacity-80 px-5 py-3 absolute left-3 right-3 bottom-3 rounded-2xl">
                <small className="flex items-center text-xs lg:text-base mb-2">
                    <IoTimeOutline className="mr-2" /> { service.date }
                </small>
                <h1 className="text-sm lg:text-lg font-montserrat-bold mb-2"> { cutText(getByLocale(service.title), 0, 100) } </h1>
            </div>
        </NavLink>
    )
}

export default ServiceCard