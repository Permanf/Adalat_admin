import { IoGlobeOutline, IoPencilOutline, IoTrashOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import getByLocale from '../../helpers/getByLocale'
import { deleteConfirm } from '../../redux/actions/siteAction'

const SiteCard = ({site}) => {
    const locale = localStorage.getItem('locale')
    const dispatch = useDispatch()
    const confirmData = {
        id: site.id,
        confirm: true
    }

    return (
        <div
            className="bg-white flex items-center col-span-12 lg:col-span-6 rounded-lg shadow-gray-sm"
        >
            <img className="w-24 h-24 object-cover rounded-xl bg-gray-50 ml-2 p-2" src={site.logo} alt={site.link} />
            <div className="flex justify-between p-2 lg:p-4 w-full">
                <div className="w-full">
                    <h1 className="text-md font-montserrat-bold mb-2"> { getByLocale(site.name) } </h1>
                    <small className="flex items-center text-sm"> <IoGlobeOutline size={18} className="mr-2" /> { site.link } </small>
                </div>
                <div>
                    <button
                        onClick={() => dispatch(deleteConfirm(confirmData))}
                        className="flex bg-white hover:bg-red-600 border border-red-600 text-red-600 hover:text-white p-2 duration-300 rounded-full my-2"
                    >
                        <IoTrashOutline size={18} />
                    </button>

                    {/* <button
                        // onClick={() => dispatch(deleteConfirm(confirmData))}
                        className="flex bg-white hover:bg-blue-600 border border-blue-600 text-blue-600 hover:text-white p-2 duration-300 rounded-full my-2"
                    >
                        <IoPencilOutline size={18} />
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default SiteCard