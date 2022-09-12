import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import getByLocale from "../../helpers/getByLocale"
import AppLayout from "../../layouts/AppLayout"
import ReactHtmlParser from 'react-html-parser'
import { setLoading } from "../../redux/reducers/mainReducer"
import { getLegislation } from "../../redux/actions/legislationAction"
import i18n from "../../locales/i18next"
const LegislationShow = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const dispatch = useDispatch()
    const locale = localStorage.getItem('locale')
    const legislation = useSelector((state) => state.legislations.legislation);
    useEffect(() => {
      
        dispatch(getLegislation(id))
    }, [])

    return (
        <AppLayout>
            {
                legislation &&
                <main className="bg-white p-5 lg:p-10 shadow-gray-sm rounded-xl">
                    <h1 className="text-xl text-green-600 capitalize font-montserrat-bold mb-5">
                        {legislation[`title_${i18n.language}`] &&  legislation[`title_${i18n.language}`] }
                   
                    </h1>

                    <p className="text-base">
                        {legislation[`description_${i18n.language}`] &&  ReactHtmlParser(legislation[`description_${i18n.language}`]) }
                   
                    </p>
                </main>
            }
        </AppLayout>
    )
}

export default LegislationShow