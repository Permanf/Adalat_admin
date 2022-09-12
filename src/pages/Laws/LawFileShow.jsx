import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import getByLocale from "../../helpers/getByLocale"
import AppLayout from "../../layouts/AppLayout"
import { getLawFile } from "../../redux/actions/lawsAction"
import ReactHtmlParser from 'react-html-parser'

const LawFileShow = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const dispatch = useDispatch()
    const law_file = useSelector(state => state.laws.law_file)

    useEffect(() => {
        dispatch(getLawFile(id))
    }, [])

    return (
        <AppLayout>
            {
                law_file &&
                <main className="bg-white p-5 lg:p-10 shadow-gray-sm rounded-xl">
                    <h1 className="text-xl text-green-600 capitalize font-montserrat-bold mb-5">
                        { law_file.title && getByLocale(law_file.title) }
                    </h1>

                    <p className="text-base">
                        { law_file.text && ReactHtmlParser(getByLocale(law_file.text)) }
                    </p>
                </main>
            }
        </AppLayout>
    )
}

export default LawFileShow