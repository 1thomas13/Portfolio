import React, { useState } from 'react'

import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'

export const Card = ({title,img,id}) => {

  const width = (id) => {
  
    
        if(id === 1 ){
          return 40
        }
        if(id === 2){
          return 60
        }
        if(id === 3){
          return 60
        }
        if(id === 4){
          return 40
        }
        if(id === 5){
          return 40
        }
        if(id === 6){
          return 60
        }
        if(id === 7){
          return 60
        }
        return 40
    

    
  } 

  return (
    <div className={ `relative  p-7 h-[29rem] flex-[0_0_${width(id)}%] `}>
      <div className=" w-full h-full relative block pointer-events-none">
        <motion.div className="rounded-3xl   pointer-events-auto relative bg-slate-900 
        overflow-hidden w-full h-full mx-0 my-auto" layoutId={`card-container-${id}`}>
          <motion.div
            className="absolute top-0 left-0 h-4/6 w-screen"
            layoutId={`card-image-container-${id}`}
          >
            <img src={`./images/${1}.jpeg`} alt="" />
          </motion.div>
          <motion.div
            className="absolute top-1 left-1 z-10"
            layoutId={`title-container-${id}`}
          >
            <span className='uppercase text-white font-black'>Categoria</span>
            <h2>{title}</h2>
          </motion.div>
        </motion.div>
      </div>
      <Link to={`/${id}`} className='absolute z-20 top-0 left-0 right-0 bottom-0' />
    </div>
  );
}
