import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import AppLayout from "../../../layouts/AppLayout"
import { setLoading } from "../../../redux/reducers/mainReducer"
import { getLegislationFile } from "../../../redux/actions/legislationFileAction"
import i18n from "../../../locales/i18next"

const LegislationFilesShow = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const dispatch = useDispatch()
    const locale = localStorage.getItem('locale')
    const legislation_files = useSelector((state) => state.legislationFiles.file);
    useEffect(() => {
      
        dispatch(getLegislationFile(id))
    }, [])

    return (
        <AppLayout>
            {
                legislation_files &&
                <main className="bg-white p-5 lg:p-10 shadow-gray-sm rounded-xl">
                    <h1 className="text-xl text-green-600 capitalize font-montserrat-bold mb-5">
                        {legislation_files[`file_title_${i18n.language}`] &&  legislation_files[`file_title_${i18n.language}`] }
                   
                    </h1>
                    <p className="text-base">
                        {legislation_files[`file_${i18n.language}`] &&  legislation_files[`file_${i18n.language}`] }
                   
                    </p>
                    
                </main>
            }
        </AppLayout>
    )
}

export default LegislationFilesShow