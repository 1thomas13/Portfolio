import React from 'react'
import {Flex,Text, Heading, useColorModeValue } from '@chakra-ui/react';
import {motion} from 'framer-motion';

export const Main = () => {

  const colorGradient = useColorModeValue('linear(to-l, #7928CA, #FF0080)', 
                                          'linear(to-l, #ac39dc, #ff33a3)'
  )  

  return (
    <Flex 
      as={motion.div} 
      initial={{y:-500,  scale: 1}} 
      animate={{y:0}}
      transition={{
        type: "spring",
        bounce: .4,
      }} 

      justifyContent='center' 
       align='center' minH="100vh"
        p={3}>
      <Heading 
        as='h1'
          // bgGradient={colorGradient}
          // bgClip='text'
          fontSize='6xl'
          fontWeight='extrabold'
          
      >
        Thomas Barreto
        <br></br>
        <Text fontSize='5xl' textAlign='center'>Web Developer</Text>
         
      </Heading>
      
    </Flex>
  )
}
