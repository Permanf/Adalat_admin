// import AppLayout from "../../layouts/AppLayout"

// import { NavLink, Redirect, useParams } from 'react-router-dom'
// import { useEffect, useState } from "react"
// import api from "../../services/api.service"
// import SmallModal from "../../components/Modal/SmallModal"
// import ServiceDelete from "./DepartmentDelete"
// import { useTranslation } from "react-i18next"
// import { IoPencilOutline, IoTimeOutline, IoTrashOutline } from "react-icons/io5"
// import cutText from "../../helpers/cutText"
// import { removeService, setMessage, showSuccess } from "../../redux/actions/serviceAction"
// import { useDispatch } from "react-redux"

// const ServiceShow = () => {
//     const { i18n } = useTranslation()
//     const { id } = useParams()
//     const dispatch = useDispatch()
//     const [service, setService] = useState(null)
//     const [open, setOpen] = useState(false)
//     const [redirect, setRedirect] = useState(false)
//     const locale = localStorage.getItem('locale')

//     const modalClose = () => {
//         setOpen(false)
//     }

//     const deleteService = () => {
//         api.delete(`/service/${id}`)
//             .then(res => {
//                 dispatch(removeService(id))
//                 dispatch(showSuccess())
//                 dispatch(setMessage('Üstünlikli pozuldy'))
//                 setRedirect(true)
//             })
//             .catch(err => setRedirect(true))
//     }

//     useEffect(() => {
//         api.get(`service/${id}`).then(res => setService(res.data.data))
//     }, [])

//     return (
//         <>
//             <SmallModal isOpen={open} close={modalClose}>
//                 <ServiceDelete delete={deleteService} close={modalClose}/>
//             </SmallModal>
//             <AppLayout>
//                 {
//                     redirect && <Redirect to="/services" />
//                 }

//                 {
//                     service &&
//                     <section className="grid grid-cols-10 gap-4 lg:gap-14 font-montserrat-medium">
//                         <main className="col-span-12 lg:col-span-7 border rounded-lg p-4 lg:p-10">
//                             <img className="w-full rounded-lg mb-4" src={service.image} alt={ service.title[locale] } />
//                             <small className="flex items-center text-base text-gray-600 mb-2">
//                                 <IoTimeOutline className="mr-2" size={22} /> { service.date }
//                             </small>

//                             <aside className="flex items-center">
//                                 <NavLink
//                                     to={`/service/${id}/edit`}
//                                     className="flex bg-white hover:bg-blue-600 border border-blue-600 text-blue-600 hover:text-white px-5 py-2 duration-300 rounded-md my-2"
//                                 >
//                                     <IoPencilOutline size={22} className="mr-2" /> Uytget
//                                 </NavLink>
                                
//                                 <button
//                                     onClick={() => setOpen(true)}
//                                     className="flex bg-white hover:bg-red-600 border border-red-600 text-red-600 hover:text-white px-5 py-2 duration-300 rounded-md my-2 ml-4"
//                                 >
//                                 <IoTrashOutline size={22} className="mr-2" /> Poz
//                                 </button>
//                             </aside>

//                             <article className="my-3">
//                                 <h1 className="text-lg lg:text-2xl font-bold font-montserrat-bold text-gray-700 mb-3"> { service.title[locale] } </h1>
//                                 <p className="text-gray-600"> { service.text[locale] } </p>
//                             </article>
//                         </main>

//                         <main className="col-span-12 lg:col-span-3 border rounded-lg">
//                             <aside className="sticky">
//                                 {
//                                     [1,2,3,4,5,].map(item => {
//                                         return(
//                                             <div className="flex p-4 border-b">
//                                                 <img className="w-32 h-20 rounded-lg" src={service.image} alt={ service.title[locale] } />
//                                                 <div className="flex flex-col px-3 overflow-hidden">
//                                                     <h1 className="text-md font-bold font-montserrat-bold text-gray-700 mb-1"> { cutText(service.title[locale], 0, 40) } </h1>
//                                                 </div>
//                                             </div>
//                                         )
//                                     })
//                                 }
//                             </aside>
//                         </main>
//                     </section>
//                 }
//             </AppLayout>
//         </>
//     )
// }

// export default ServiceShow
