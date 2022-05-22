import React from 'react'

export const Project = ({title,img,description}) => {
  return (
    <card className='border  hover:blur-sm  '>
        <img className='w-full ' src={img} alt={`img ${img}`} />
        <button>Mostrar</button>
    </card>
  )
}
