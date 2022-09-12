import AppLayout from "../../layouts/AppLayout"
import ReactHtmlParser from 'react-html-parser'
import { NavLink, Redirect, useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import SmallModal from "../../components/Modal/SmallModal"
import NewsDelete from "./NewsDelete"
import { IoPencilOutline, IoTimeOutline, IoTrashOutline } from "react-icons/io5"
import { getNewsItem, removeNews } from "../../redux/actions/newsAction"
import { useDispatch, useSelector } from "react-redux"
import getByLocale from "../../helpers/getByLocale"
import { setLoading } from "../../redux/reducers/mainReducer"

const NewsShow = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const news_item = useSelector(state => state.news.news_item)
    const redirect = useSelector(state => state.main.redirect)
    // console.log(news_item);
    const modalClose = () => {
        setOpen(false)
    }

    const deleteNews = () => {
        dispatch(removeNews(id))
        dispatch(setLoading(true))
    }

    useEffect(() => {
        dispatch(getNewsItem(id))
    }, [])

    return (
        <>
            <SmallModal isOpen={open} close={modalClose}>
                <NewsDelete deleteNews={deleteNews} modalClose={modalClose}/>
            </SmallModal>

            <AppLayout>
                {
                    redirect && <Redirect to="/news" />
                }

                {
                    news_item &&
                    <section className="bg-white shadow-gray rounded-lg mb-10">
                        <main className="p-4">
                            <img className="w-2/4 rounded-lg mb-5" src={news_item.image} alt={ news_item.title && getByLocale(news_item.title) } />
                            <small className="flex items-center text-base text-gray-600 mb-2">
                                <IoTimeOutline className="mr-2" size={22} /> { news_item.created_at }
                            </small>

                            <aside className="flex items-center">
                                <NavLink
                                    to={`/news/${id}/edit`}
                                    className="flex bg-white hover:bg-blue-600 border border-blue-600 text-blue-600 hover:text-white px-3 py-1 text-sm duration-300 rounded-md my-2"
                                >
                                    <IoPencilOutline size={22} className="mr-2" /> Üýtget
                                </NavLink>
                                
                                <button
                                    onClick={() => setOpen(true)}
                                    className="flex bg-white hover:bg-red-600 border border-red-600 text-red-600 hover:text-white px-3 py-1 text-sm duration-300 rounded-md my-2 ml-4"
                                >
                                    <IoTrashOutline size={22} className="mr-2" /> Poz
                                </button>
                            </aside>

                            <article className="my-3">
                                <h1 className="text-lg lg:text-2xl font-bold font-montserrat-bold text-gray-700 mb-3"> { news_item.title && getByLocale(news_item.title) } </h1>
                                <p className="text-gray-600"> { news_item.text && ReactHtmlParser(getByLocale(news_item.text)) } </p>
                            </article>
                        </main>
                    </section>
                }
            </AppLayout>
        </>
    )
}

export default NewsShow
