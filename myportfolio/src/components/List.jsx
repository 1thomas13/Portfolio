import React from 'react'
import { items } from '../data'
import { Card } from './Card'

export const List = () => {


  return (
    <div >
      <h2 className='block '>Projects</h2>
      <br className='bg-white text-white'></br>
    <div className='px-96 card-list flex content-start flex-wrap '>
      
      {
        items.map(card =>{
          return <Card key={card.id} {...card}/>
        })
      }
        
    </div>
    </div>
  )
}
