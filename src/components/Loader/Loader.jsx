import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from 'react'
import Marquee from "react-fast-marquee"
import Goller from '../../assets/images/goller.png'

const Loader = ({time = 5000}) => {
    const [load, setLoad] = useState(true)

    useEffect(() => {
        // setTimeout(() => setLoad(false), time)
    }, [])

    return (
        <AnimatePresence>
            {
                load &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition = {{
                        type: "spring",
                        stiffness: 15,
                        opacity: { duration: .5 },
                    }}
                    className="loader-bg backdrop-filter backdrop-blur z-50 text-white flex flex-col items-center justify-center fixed top-0 left-0 right-0 bottom-0"
                >
                    <Marquee speed={100} gradient={false} direction="left">
                        <img className="lg:w-full w-96" src={Goller} alt="Goller" />
                    </Marquee>
                    <h1 className="animate-bounce font-montserrat-bold text-3xl lg:text-7xl uppercase my-20"> Garaşyň ýüklenýär! </h1>
                    <Marquee speed={100} gradient={false} direction="right">
                        <img className="lg:w-full w-96" src={Goller} alt="Goller" />
                    </Marquee>
                </motion.div>
            }
        </AnimatePresence>
    )
}
export default Loader