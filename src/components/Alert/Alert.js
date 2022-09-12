import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Alert = (props) => {
    const [show, setShow] = useState(true)

    setTimeout(() => setShow(false), 2000)

    return (
        <AnimatePresence exitBeforeEnter>
            {
                show &&
                <>
                    <motion.main
                        initial={{ translateY: '-100%', opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        exit={{ translateY: '-100%', opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`${props.success && 'bg-green-500'} ${props.error && 'bg-red-600'} z-50 fixed top-28 left-0 right-0 lg:left-1/4 -ml-5 lg:ml-72 px-4`}
                    >
                        <div className="text-white font-montserrat-bold text-2xl px-5 py-2">
                            {props.message}
                        </div>
                    </motion.main>
                </>
            }
        </AnimatePresence>
    );
};

export default Alert