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
      y: 300,
      display: 'none',
    },
    onscreen: {
      y: 0,
      display: 'block',
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 1,
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
        as='h1'
        fontSize='6xl'
        fontWeight='extrabold'
      >
        Thomas Barreto
        <br></br>
        <Text fontSize='5xl' textAlign='center'>Web Developer</Text>
         
      </Heading>

      <motion.div variants={variants}>
        I’m developer located in Argentina. Mainly focused on the MERN
        stack.
        <br></br>
        My goal is to learn more about this world, the world of technology.
        <br></br>
      </motion.div>

      <Button my={8}  href="../../Thomas Currículum.pdf" download as='a' variant="outline">
          View Resume
      </Button>
        
      <HStack justifyContent="center" alignItems="center">
        <Tooltip label="HTML">
          <Box p="1">
            <Icon w={10} h={10} as={FaHtml5} />
          </Box>
        </Tooltip>

        <Tooltip label="CSS">
          <Box p="1">
            <Icon w={10} h={10} as={FaCss3} />
          </Box>
        </Tooltip>

        <Tooltip label="JavaScript">
          <Box p="1">
            <Icon w={10} h={10} as={FaJsSquare} />
          </Box>
        </Tooltip>

        <Tooltip label="React">
          <Box p="1">
            <Icon w={10} h={10} as={FaReact} />
          </Box>
        </Tooltip>

        <Tooltip label="Next">
          <Box p="1">
            <Icon w={10} h={10} as={SiNextDotJs} />
          </Box>
        </Tooltip>

        <Tooltip label="Node">
          <Box p="1">
            <Icon w={10} h={10} as={FaNodeJs} />
          </Box>
        </Tooltip>

        <Tooltip label="MongoDB">
          <Box p="1">
            <Icon w={10} h={10} as={SiMongodb} />
          </Box>
        </Tooltip>

        <Tooltip label="Mysql">
          <Box p="1">
            <Icon w={10} h={10} as={SiMysql} />
          </Box>
        </Tooltip>
      </HStack>
    </VStack>
  );
};
