import React from 'react'
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { FaHome, FaFolderOpen,FaUserAlt, FaComment } from 'react-icons/fa';
import {motion} from 'framer-motion'

import {
    Button,
    Flex,
    Spacer,  
    useColorModeValue
} from '@chakra-ui/react';

export const NavBar = () => {

  return (
    <Flex 
      p={2} 
      position={{base:'block', md:'fixed'}} 
      zIndex={1000}
      width='100%' 
    >
        <Spacer />
        <ColorModeSwitcher/>
    </Flex>
  )
}
