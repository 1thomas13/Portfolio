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

  const bg = useColorModeValue('white', '#1A202C')

  return (
    <Flex 
    initial={{y:-500,}} 
    animate={{y:0, }}
    transition={{duration: 3}}
    
      as={motion.ul} 
      p={2} 
      position='fixed' 
      width='100%' 
      bgColor={bg} 
      direction='row' 
      gap={4}
    >
      <a href='/'>
        <Button as={'li'} variant='ghost' leftIcon={<FaHome/>}>
          Home 
        </Button> 
      </a>
      <a href='/'>
        <Button as={'li'} variant='ghost' leftIcon={<FaUserAlt/>}>
          About Me 
        </Button>
      </a>
      <a href='/'>
        <Button as={'li'} variant='ghost' leftIcon={<FaFolderOpen/>}>
          Projects
        </Button>
      </a>
      <a href='/'>
        <Button as={'li'} variant='ghost' leftIcon={<FaComment/>}>
          Contact
        </Button>
      </a>
        <Spacer />
        <ColorModeSwitcher/>
    </Flex>
  )
}
