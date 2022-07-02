import React from 'react';
import {
  HStack,
  Box,
  Heading,
  VStack,
  Button,
  Icon,
  Tooltip,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaJsSquare, FaCss3, FaHtml5 } from 'react-icons/fa';
import { SiNextDotJs, SiMongodb, SiMysql } from 'react-icons/si';

export const Main = () => {

  const variants = {
    offscreen: {
      x: -1300,
    },
    onscreen: {
      x: 0,
      transition: {
        type: 'spring',
        bounce: 0.2,
        delay:0.4,
        duration: 1.3,
      },
    },
  };

  const variantss = {
    offscreen: {
      y: -1300,
    },
    onscreen: {
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.2,
        delay:0.4,
        duration: 1.3,
      },
    },
  };

 

  return (
    <VStack
      as={motion.div}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      m={2}
      textAlign="center"
      spacing={8}
      height='80vh'
      alignItems='center'
      justifyContent="center"
      h='100vh'
    >
      <Heading 
        as={motion.h1}
        variants={variantss}
        fontSize={{base:'4xl', sm:'5xl', md:'6xl'}}
        fontWeight='extrabold'
      >
        Thomas Barreto
        <br></br>
        <Text fontSize={{base:'2xl', sm:'4xl', md:'5xl'}} textAlign='center'>Web Developer</Text>
         
      </Heading>

      <motion.div variants={variants}>
        I’m developer located in Argentina. Mainly focused on the MERN
        stack.
        <br></br>
        My goal is to learn more about this world, the world of technology.
        <br></br>
      </motion.div>

      <Button  as={motion.a}
        variants={variantss} my={8}  href="../../Thomas Currículum.pdf" download  variant="outline">
          View Resume
      </Button>
        
      <HStack as={motion.div}
        variants={variantss} justifyContent="center" alignItems="center">
        <Tooltip label="HTML">
          <Box p={{base: 0, md:1}}>
            <Icon w={{base:8, md:10}} h={{base:8, md:10}} as={FaHtml5} />
          </Box>
        </Tooltip>

        <Tooltip label="CSS">
          <Box p={{base: 0, md:1}}>
            <Icon w={{base:8, md:10}} h={{base:8, md:10}} as={FaCss3} />
          </Box>
        </Tooltip>

        <Tooltip label="JavaScript">
          <Box p={{base: 0, md:1}}>
            <Icon w={{base:8, md:10}} h={{base:8, md:10}} as={FaJsSquare} />
          </Box>
        </Tooltip>

        <Tooltip label="React">
          <Box p={{base: 0, md:1}}>
            <Icon w={{base:8, md:10}} h={{base:8, md:10}} as={FaReact} />
          </Box>
        </Tooltip>

        <Tooltip label="Next">
          <Box p={{base: 0, md:1}}>
            <Icon w={{base:8, md:10}} h={{base:8, md:10}} as={SiNextDotJs} />
          </Box>
        </Tooltip>

        <Tooltip label="Node">
          <Box p={{base: 0, md:1}} >
            <Icon w={{base:8, md:10}} h={{base:8, md:10}} as={FaNodeJs} />
          </Box>
        </Tooltip>

        <Tooltip label="MongoDB">
          <Box p={{base: 0, md:1}}>
            <Icon w={10} h={10} as={SiMongodb} />
          </Box>
        </Tooltip>

        <Tooltip label="Mysql">
          <Box p={{base: 0, md:1}}>
            <Icon w={10} h={10} as={SiMysql} />
          </Box>
        </Tooltip>
      </HStack>
    </VStack>
  );
};
