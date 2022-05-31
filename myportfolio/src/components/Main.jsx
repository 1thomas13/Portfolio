import React from 'react'

export const Main = () => {
  return (
    <div className=" flex justify-center  items-center  h-screen">
      <h1 className=' font-extrabold tracking-tighter  text-8xl'>
        <span className="tittle block before:absolute tracking-tighter before:content-['Thomas'] before:bg-gradient-to-r relative before:from-cyan-500 before:to-blue-500">
          Thomas
        </span >
        <span className="tittle block before:absolute tracking-tighter before:content-['Barreto'] before:bg-gradient-to-r relative before:from-cyan-500 before:to-blue-500">
          Barreto
        </span>
        <span className="tittle block before:absolute tracking-tighter before:content-['WebDeveloper'] before:bg-gradient-to-r relative before:from-cyan-500 before:to-blue-500"> 
          WebDeveloper
        </span>
      </h1>
    </div>
  )
}
