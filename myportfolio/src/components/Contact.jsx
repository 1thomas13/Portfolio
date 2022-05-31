import React from 'react'

export const Contact = () => {
  return (
    <div className='my-12'>
      <form className='flex items-center justify-center flex-col'>
        <h3 className='text-5xl font-bold'>
          Contact
        </h3>
        <input className='m-1 px-4 py-2 block border w-4/12 text-black' type='text' placeholder='Name' name='name' />
        <input className='m-1 px-4 py-2 block border w-4/12 text-black'  type='email' placeholder='Email' />
        <textarea className='m-1 mb-4 px-4 py-2 block h-24 border w-4/12' placeholder='Your Message' ></textarea>
        <button className='border w-1/12' type='submit' value='Enviar'>Enviar</button>
      </form>
    </div>
  )
}
