import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import getByLocale from "../../../helpers/getByLocale"
import AppLayout from "../../../layouts/AppLayout"
import ReactHtmlParser from 'react-html-parser'
import { getQuestionAnswer } from "../../../redux/actions/questionAnswerAction"
import { setLoading } from "../../../redux/reducers/mainReducer"

const SubCategoryFileShow = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const dispatch = useDispatch()
    const question_answer = useSelector(state => state.questionAnswer.question_answer)

    useEffect(() => {
      
        dispatch(getQuestionAnswer(id))
    }, [])

    return (
        <AppLayout>
            {
                question_answer &&
                <main className="bg-white p-5 lg:p-10 shadow-gray-sm rounded-xl">
                    <h1 className="text-xl text-green-600 capitalize font-montserrat-bold mb-5">
                        { question_answer.title && getByLocale(question_answer.title) }
                    </h1>

                    <p className="text-base">
                        { question_answer.text && ReactHtmlParser(getByLocale(question_answer.text)) }
                    </p>
                </main>
            }
        </AppLayout>
    )
}

export default SubCategoryFileShow