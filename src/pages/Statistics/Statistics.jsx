import { useEffect, useState } from "react"
import AppLayout from "../../layouts/AppLayout"
import CountUp from 'react-countup'
import { useDispatch, useSelector } from "react-redux"
import {
    loadStatistics,
    putStatistics,
    setAcceptCompleted,
    setAllQuestion,
    setForeignQuestion,
    setTmQuestion
} from "../../redux/reducers/statisticReducer"
import { useTranslation } from "react-i18next"
import { IoStatsChartOutline } from "react-icons/io5"

const Statistics = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const all_questions = useSelector(state => state.statistics.all_questions)
    const tm_questions = useSelector(state => state.statistics.tm_questions)
    const foreign_questions = useSelector(state => state.statistics.foreign_questions)
    const accept_completed = useSelector(state => state.statistics.accept_completed)

    const onSubmit = e => {
        e.preventDefault()

        const data = {
            all_questions,
            tm_questions,
            foreign_questions,
            accept_completed,
        }

        dispatch(putStatistics(data))
    }

    useEffect(() => {
        dispatch(loadStatistics())
    }, [])

    return (
        <AppLayout>
            <section className="bg-white rounded-xl p-3">
                <h1 className="flex p-3 text-xl font-bold font-montserrat-bold text-gray-700">
                    <IoStatsChartOutline size="24" className="mr-2" />
                    { t('statistics') }
                </h1>

                <main className="grid grid-cols-12 gap-5 lg:gap-10 font-montserrat-bold text-green-900 text-xl px-5 py-7">
                    <aside className="col-span-12 lg:col-span-6 my-5 relative bg-green-50 border border-green-200 p-8 rounded-lg">
                        <h1 className="bg-white text-6xl px-3 rounded-lg absolute -top-8">
                            { <CountUp end={all_questions} duration={1}/> }
                        </h1>
                        <p className="mt-5"> Umumy ýüzlenme sany </p>
                    </aside>


                    <aside className="col-span-12 lg:col-span-6 my-5 relative bg-green-50 border border-green-200 p-8 rounded-lg">
                        <h1 className="bg-white text-6xl px-3 rounded-lg absolute -top-8">
                            { <CountUp end={tm_questions} duration={1}/> }
                        </h1>
                        <p className="mt-5"> Türkmenistanyň çäginden gelen ýüzlenmeler </p>
                    </aside>


                    <aside className="col-span-12 lg:col-span-6 my-5 relative bg-green-50 border border-green-200 p-8 rounded-lg">
                        <h1 className="bg-white text-6xl px-3 rounded-lg absolute -top-8">
                            { <CountUp end={foreign_questions} duration={1}/> }
                        </h1>
                        <p className="mt-5"> Ýurt daşyndan gelen ýüzlenmeler </p>
                    </aside>


                    <aside className="col-span-12 lg:col-span-6 my-5 relative bg-green-50 border border-green-200 p-8 rounded-lg">
                        <h1 className="bg-white text-6xl px-3 rounded-lg absolute -top-8">
                            { <CountUp end={accept_completed} duration={1}/> }
                        </h1>
                        <p className="mt-5"> Kabul edilen we işleninlen ýüzlenmeler </p>
                    </aside>
                </main>


                <form
                    onSubmit={e => onSubmit(e)}
                    className="grid grid-cols-12 gap-5 lg:gap-10 font-montserrat-bold text-green-900 text-xl px-5 py-7"
                >
                    <aside className="flex flex-col col-span-12 lg:col-span-6">
                        <small className="text-gray-600"> Umumy ýüzlenme sany </small>
                        <input
                            onChange={e => dispatch(setAllQuestion(e.target.value))}
                            type="text"
                            value={all_questions}
                            className="border border-gray-200 focus:border-gray-400 px-5 py-3 my-3 rounded-lg"
                        />
                    </aside>


                    <aside className="flex flex-col col-span-12 lg:col-span-6">
                        <small className="text-gray-600"> Türkmenistanyň çäginden gelen </small>
                        <input
                            onChange={e => dispatch(setTmQuestion(e.target.value))}
                            type="text"
                            value={tm_questions}
                            className="border border-gray-200 focus:border-gray-400 px-5 py-3 my-3 rounded-lg"
                        />
                    </aside>


                    <aside className="flex flex-col col-span-12 lg:col-span-6">
                        <small className="text-gray-600"> Ýurt daşyndan gelen </small>
                        <input
                            onChange={e => dispatch(setForeignQuestion(e.target.value))}
                            type="text"
                            value={foreign_questions}
                            className="border border-gray-200 focus:border-gray-400 px-5 py-3 my-3 rounded-lg"
                        />
                    </aside>


                    <aside className="flex flex-col col-span-12 lg:col-span-6">
                        <small className="text-gray-600"> Kabul edilen we işleninlen </small>
                        <input
                            onChange={e => dispatch(setAcceptCompleted(e.target.value))}
                            type="text"
                            value={accept_completed}
                            className="border border-gray-200 focus:border-gray-400 px-5 py-3 my-3 rounded-lg"
                        />
                    </aside>

                    <aside className="col-span-12 flex items-center justify-center">
                        <button className="px-10 py-3 bg-green-600 text-white rounded-lg"> Ýatda sakla </button>
                    </aside>
                </form>
            </section>
        </AppLayout>
    )
}

export default Statistics