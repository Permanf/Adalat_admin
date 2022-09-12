import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import AppLayout from "../../layouts/AppLayout"
import { setLoading } from "../../redux/reducers/mainReducer"
import api from "../../services/api.service"

import ReactHtmlParser from 'react-html-parser'


const LiteratureShow = () => {
  const { t,i18n } = useTranslation()
  const { id } = useParams()
  const dispatch = useDispatch()
  const [data,setData] = useState(null)

  const fetchData = async () => {
    dispatch(setLoading(true))
    try {
      const response = await api.get(`/front/law-literature/show/${id}`,{
        params:{locale:i18n.language}
      })
      if (response.status === 200) {
        setData(response.data[`law-literature`])
      }
    }
    catch (e) {

    }
    dispatch(setLoading(false))
  }
  useEffect(() => {
      fetchData()
  }, [i18n.language])

  return (
      <AppLayout>
          {
              data &&
              <main className="bg-white p-5 lg:p-10 shadow-gray-sm rounded-xl">
                  <h1 className="text-xl text-green-600 capitalize font-montserrat-bold mb-5">
                      { data && data[`title`] }
                      
                  </h1>

                  <p className="text-base">
                      { data && ReactHtmlParser(data[`text`]) }
                  </p>
              </main>
          }
      </AppLayout>
  )
}

export default LiteratureShow