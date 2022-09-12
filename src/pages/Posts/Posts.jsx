import AppLayout from "../../layouts/AppLayout"
import EmptyList from "../../components/Empty/EmptyList"
import { IoAddCircleOutline } from "react-icons/io5"

import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import PostCard from "./PostCard"
import { loadPosts } from "../../redux/actions/postAction"
import ReactPaginate from 'react-paginate'

const Posts = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const posts = useSelector(state => state.post.posts)
    const postsTotal = useSelector(state => state.post.total)
    const lastPage = useSelector(state => state.post.last_page)
    const [page, setPage] = useState(1)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        dispatch(loadPosts(page))
    }, [page])

    return (
        <AppLayout>
            <aside className="bg-white p-3 rounded-lg flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
                        { t('posts') }
                    </h1>
                    <small className="flex font-montserrat-medium text-sm text-gray-500">
                        <p>
                            { t('total') }:
                        </p>
                        <p className="ml-2">
                            { postsTotal }
                        </p>
                    </small>
                </div>

                <NavLink
                    to="/post/create"    
                    className="bg-white font-montserrat-medium text-green-600 hover:bg-green-600 hover:text-white duration-300 flex items-center px-4 rounded-md py-2 text-md"
                >
                    <IoAddCircleOutline size={24} className="mr-2" /> { t('add') }
                </NavLink>
            </aside>

            {
                posts && posts.length === 0 && <EmptyList message={t('empty_list')} />
            }

            <main className="grid grid-cols-12 gap-3 lg:gap-10 my-7">
                {
                    posts && posts.map((post, index) => {
                        return <PostCard key={index} post={post} />
                    })
                }
            </main>

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
        </AppLayout>
    )
}

export default Posts
