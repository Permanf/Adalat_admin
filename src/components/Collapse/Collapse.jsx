import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoEllipsisVerticalOutline } from "react-icons/io5";

const Collapse = ({ children, className }) => {
  const [select, setSelect] = useState(false);

  return (
    <aside className="flex items-center">
      <div className="w-8" onClick={() => setSelect(!select)}>
        <button
          className={`bg-gray-50 hover:bg-gray-200 ${
            select === true ? "bg-gray-300" : ""
          } duration-500 text-gray-800 p-2 rounded-lg`}
        >
          <IoEllipsisVerticalOutline size={20} />
        </button>
      </div>
      <AnimatePresence>
        {select && (
          <motion.div
            onClick={()=>{setTimeout(()=>{setSelect(!select)},1000)}}
            initial={{ x: "15vh", opacity: 0, scale: 0 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: "15vh", opacity: 0, scale: 0 }}
            transition={{ type: "tween", duration: 0.4 }}
            className={`bg-white font-montserrat-medium overflow-hidden rounded-md border absolute mt-3 top-10 right-1 z-10 ${className}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default Collapse;
