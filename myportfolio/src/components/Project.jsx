import React from 'react'

export const Project = ({title,img,description}) => {
  return (
    <card className='border-4bg-black border-color: rgb(75 85 99)'>
        <img className='w-full' src={img} alt={`img ${img}`} />
    </card>
  )
}
