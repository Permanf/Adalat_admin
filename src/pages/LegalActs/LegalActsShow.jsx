import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import AppLayout from "../../layouts/AppLayout"
import { setLoading } from "../../redux/reducers/mainReducer"
import api from "../../services/api.service"

import ReactHtmlParser from 'react-html-parser'


const LegalActsShow = () => {
  const { t, i18n } = useTranslation()
  const { id } = useParams()
  const dispatch = useDispatch()
  const [data, setData] = useState(null)

  const fetchData = async () => {
    dispatch(setLoading(true))
    try {
      const response = await api.get(`/front/regulatory_legal/${id}`, {
        params:{locale:i18n.language}
      })
      if (response.status === 200) {
        setData(response.data.data)
      }
    }
    catch (e) {

    }
    dispatch(setLoading(false))
  }
  useEffect(() => {
    fetchData()
  }, [i18n.language])
  // debugger
  return (
    <AppLayout>
      {
        data &&
        <main className="bg-white p-5 lg:p-10 shadow-gray-sm rounded-xl">
          <h1 className="text-xl text-green-600 capitalize font-montserrat-bold mb-5">
            {data && data[`title`]}

          </h1>
          <div className="grid lg:grid-cols-3 grid-cols-1 py-4 bg-gray-100 px-4 rounded">
            <div >
              <div className="font-semibold">Nama belgi</div>
              {data.registration_id}
            </div>

            <div >
              <div className="font-semibold">Kabul edilen senesi</div>
              {data.registration_date}
            </div>
            {data.last_updated &&
              <div >
                <div className="font-semibold">Soňky üýtgeme</div>
                {data.last_updated}
              </div>

            }
          </div>

          <p className="text-base p-2">
            {data && ReactHtmlParser(data[`description`])}
          </p>
        </main>
      }
    </AppLayout>
  )
}

export default LegalActsShow