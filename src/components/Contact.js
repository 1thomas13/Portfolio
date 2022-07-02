import React from 'react';
import {
  VStack,
  HStack,
  Heading,
  Stack,
  Input,
  Textarea,
  Button,
  Icon,
  Text,
  Flex
} from '@chakra-ui/react';
import { FaLinkedin, FaTwitterSquare, FaGithubSquare } from 'react-icons/fa';
import { BsArrowUp } from 'react-icons/bs';
import { motion } from 'framer-motion';

export const Contact = () => {
  
  const variants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
      transition: {
        delay:0.4,
        duration: 1.3,
      },
    },
  };

  const variantsFooter = {
    offscreen: {
      x: -1300,
    },
    onscreen: {
      x: 0,
      transition: {
        type: 'spring',
        bounce: 0.4,
        delay:0.1,
        duration: 1.8,
      },
    },
  };

  return (
    < >
      <VStack
        as={motion.div}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        spacing={8}
        align="center"
        justify='center'
        height='90vh'
      >
        <Heading as={motion.h3} variants={variants}>
          Contact
        </Heading>

        
          <Stack
            as={motion.div}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            width={{base:64, md:96}}
            spacing={6}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Input as={motion.input} variants={variants} p="2" ho type="string" variant="flushed" placeholder="Name" />
            <Input
              as={motion.input} variants={variants}
              p="2"
              type="email"
              variant="flushed"
              placeholder="Enter Email"
            />
            <Textarea as={motion.textarea} variants={variants} p="2" placeholder="Your Message" variant="flushed" />

            <Button as={motion.button} variants={variants} margin='50px' type="submit" width="200px" maxW="50%" variant="outline">
              Submit
            </Button>
          </Stack>
        

        <HStack 
          as={motion.div}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          spacing={8}
         >
          <motion.div variants={variants}
            onClick={() => window.open('https://www.linkedin.com/in/thomas-barreto-50ab71204/')}
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 1.3 }}
          >
            <Icon cursor="pointer" h={10} w={10} as={FaLinkedin} />
          </motion.div>
          <motion.div variants={variants}
            onClick={() => window.open('https://twitter.com/thomasbarreto9')}
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 1.3 }}
          >
            <Icon cursor="pointer" h={10} w={10} as={FaTwitterSquare} />
          </motion.div>
          <motion.div variants={variants}
            onClick={() => window.open('https://github.com/1thomas13')}
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 1.3 }}
          >
            <Icon cursor="pointer" h={10} w={10} as={FaGithubSquare} />
          </motion.div>
        </HStack>
      </VStack>
      
      <Stack
        as={motion.footer}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        h="10vh"
        justify="center"
        align="center"
      >
        <motion.div variants={variantsFooter} textAlign="center">
          <Text fontWeight={500} as='em' fontSize={{base:'xs', md:'md'}}> Made in Chakra and Framer Motion by Thomas Barreto</Text>
        </motion.div> 
      </Stack>
    </>
  );
};
