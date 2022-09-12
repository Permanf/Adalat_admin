import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import getByLocale from "../../helpers/getByLocale"
import AppLayout from "../../layouts/AppLayout"
import ReactHtmlParser from 'react-html-parser'
import { setLoading } from "../../redux/reducers/mainReducer"
import i18n from "../../locales/i18next"
import { getReception } from "../../redux/actions/receptionAction"
const ReceptionShow = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const dispatch = useDispatch()
    const locale = localStorage.getItem('locale')
    const reception = useSelector((state) => state.receptions.reception);
    useEffect(() => {
      
        dispatch(getReception(id))
    }, [])

    return (
        <AppLayout>
            {
                reception &&
                <main className="bg-white p-5 lg:p-10 shadow-gray-sm rounded-xl">
                    <h1 className="text-xl text-green-600 capitalize font-montserrat-bold mb-5">
                        {reception[`title_${i18n.language}`] &&  reception[`title_${i18n.language}`] }
                   
                    </h1>

                    
                    {reception[`description_${i18n.language}`] &&  <div className="mx-auto w-full backTable" dangerouslySetInnerHTML={{ __html: reception[`description_${i18n.language}`] || 'null' }}></div>}
                   
                    <div className="flex flex-col mx-2">
                        
                    {reception[`address_${i18n.language}`] && (<div className="my-2">
                        <b>{t("Salgysy")}: </b>
                         {reception[`address_${i18n.language}`]}
                        </div>)}
                        {reception[`work_time_${i18n.language}`] && (<div className="my-2">
                        <b>{t("Wagty")}: </b>
                        {reception[`work_time_${i18n.language}`]}
                        </div>)}
                      
                        {reception[`contact_${i18n.language}`] && (
                        <div className="my-2">
                            <b>{t("Habarlaşmak üçin")}: </b>
                            {reception[`contact_${i18n.language}`]}
                        </div>
                        )}
                    </div>
                </main>
            }
        </AppLayout>
    )
}

export default ReceptionShow