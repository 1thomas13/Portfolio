import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


export function Project({ id }) {
  

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        style={{ pointerEvents: "auto" }}
        className="fixed bg-black/[.9] top-0 bottom-0 left-0 z-40 w-full"
      >
        <Link to="/" >cerrarrrrrrr</Link>
      </motion.div>
      <div className="top-0 mt-12 mx-auto left-0 right-0 fixed z-50 overflow-hidden px-4 max-w-2xl">
        <motion.div className="rounded-3xl pointer-events-auto relative bg-slate-900 overflow-hidden w-full h-full  "
         layoutId={`card-container-${id}`}
        >

          <motion.div className="absolute top-0 left-0 overflow-hidden h-96  w-screen" layoutId={`card-image-container-${id}`}
          >
            <img src={`images/1.jpeg`} alt="" />
          </motion.div>
          <motion.div
            className="absolute top-1 left-1 z-10"
            layoutId={`title-container-${id}`}
          >
            <span className="uppercase text-white font-black">category</span>
            <h2>titulo</h2>
          </motion.div>
          <motion.div className=" p-cardContent text-white" animate>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat at consequatur repellat obcaecati nobis illo. Excepturi illum laborum eligendi necessitatibus, autem natus rem quisquam tempora, molestiae nostrum odio perspiciatis ducimus!
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
