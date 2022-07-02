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
      initial={{y:-500,}} 
      animate={{y:0, }}
      transition={{duration: 3}}
      p={2} 
      position='fixed' 
      zIndex={1000}
      width='100%' 
    >
        <Spacer />
        <ColorModeSwitcher/>
    </Flex>
  )
}
