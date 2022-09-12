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
import api from "../../services/api.service"

const Viewed=({counter,title}) =>{
    const { t } = useTranslation()
    return(
        <aside className="col-span-12 md:col-span-6 lg:col-span-4 my-5 relative bg-white border border-green-200 p-8 rounded-lg">
            <h1 className=" text-black text-6xl px-3 rounded-lg absolute -top-8">
                { <CountUp end={counter && counter} duration={1}/> }
            </h1>
            <p className="mt-5"> {t(title)}</p>
        </aside>
    );
};

const WebsiteStatistics = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [numbers,setNumbers]=useState()
    const [sms,setSms]=useState()

    useEffect(()=>{
        api.get('/web_site_statistics').then(res=>{
            setNumbers(res.data.data[0])
      
        })
        api.get('/notariat_sms_statistcs').then(res=>{
            setSms(res.data.data)
      
        })
 
    },[])
   
    return (
        <AppLayout>
            <section className="bg-white rounded-xl p-3">
                <h1 className="flex p-3 text-xl font-bold font-montserrat-bold text-gray-700">
                    <IoStatsChartOutline size="24" className="mr-2" />
                    { t('statistics') }
                </h1>

                <main className="grid grid-cols-12 gap-5 lg:gap-10 font-montserrat-bold text-green-900 text-xl px-5 py-7">
                    
                    {numbers && Object.keys(numbers).map((number, index) => 
                    (<Viewed counter={number  && numbers[number]} title={number}/>)
                    )}
                    {sms?.map((item, index)=>{
                        return(
                            <aside key={index} className="col-span-12 md:col-span-6 lg:col-span-4 my-5 relative bg-white border border-green-200 p-8 rounded-lg">
            <h1 className=" text-black text-6xl px-3 rounded-lg absolute -top-8">
                { <CountUp end={item.total && item.total} duration={1}/> }
            </h1>
            <p className="mt-5">{`Sms statistikasy (${item.state})`}</p>
        </aside>
                        )
                    })}
                
                    
                </main>


                   
            </section>
        </AppLayout>
    )
}

export default WebsiteStatistics