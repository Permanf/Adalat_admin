import { AnimatePresence, motion } from "framer-motion";
import ReactTooltip from "react-tooltip";

const Modal = (props) => {
  return (
    <AnimatePresence>
      {props.isOpen && (
        <>
          <div
            onClick={() => props.close()}
            className="bg-gray-700 backdrop-filter backdrop-blur bg-opacity-50 z-40 fixed w-screen h-screen top-0 left-0 cursor-pointer">
          </div>
          <ReactTooltip className="font-montserrat-bold" />
          <motion.main
            initial={{ translateX: '100%' }}
            animate={{ translateX: 0 }}
            exit={{ translateX: '100%' }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full lg:w-5/12 z-50 rounded-sm overflow-x-hidden fixed top-0 right-0 h-full"
          >
            <div className="bg-white p-5">
              {props.children}
            </div>
          </motion.main>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal