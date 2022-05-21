import React from 'react'

export const Navbar = () => {
  return (
    <nav className='bg-slate-900 border-b-4 border-slate-500'>
      <ul className='pl-24 flex text-white gap-4'>
        <li>
          <a href='/' className='hover:text-yellow-200'>
            Home
          </a>
        </li>
        <li>
          <a href='/' className='hover:text-yellow-200'>
            Abour me
          </a>
        </li>
        <li>
          <a href='/' className='hover:text-yellow-200'>
            Projects
          </a>
        </li>
        <li>
          <a href='/' className='hover:text-yellow-200'>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  )
}
