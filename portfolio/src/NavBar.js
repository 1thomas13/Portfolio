import React from 'react'
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { FaHome, FaFolderOpen,FaUserAlt, FaComment } from 'react-icons/fa';


import {
    Box,  
} from '@chakra-ui/react';

export const NavBar = () => {
  return (
    <nav>
        <ul>
            <li> {<FaHome />} Home</li>
            <li> {<FaUserAlt />} About Me</li>
            <li> {<FaFolderOpen />} Project</li>
            <li> {<FaComment />} Contact </li>
           
        </ul>
        <ColorModeSwitcher justifySelf="flex-end" />
        
    </nav>
  )
}
