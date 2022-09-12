import { AnimatePresence, motion } from "framer-motion"
import { PulseLoader } from 'react-spinners'

const MiniLoader = ({time = 5000}) => {

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition = {{
                    type: "spring",
                    stiffness: 15,
                    opacity: { duration: .5 },
                }}
                className="bg-white rounded-xl p-3 my-3"
            >
                <PulseLoader color="green" size={24}/>
            </motion.div>
        </AnimatePresence>
    )
}
export default MiniLoader