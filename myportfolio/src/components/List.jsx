import React from 'react'
import { Project } from './Project'

export const List = () => {


  return (
    <div className='grid m-auto  md:grid-cols-2 xl:grid-cols-3 '>
        <Project title={'proyecto1'} img={'./person-icon.png'} description={'description'}/>
        <Project title={'proyecto2'} img={'./person-icon.png'} description={'description2'}/>
        <Project title={'proyecto1'} img={'./person-icon.png'} description={'description'}/>
        <Project title={'proyecto2'} img={'./person-icon.png'} description={'description2'}/>
        <Project title={'proyecto1'} img={'./person-icon.png'} description={'description'}/>
        <Project title={'proyecto2'} img={'./person-icon.png'} description={'description2'}/>
    </div>
  )
}
