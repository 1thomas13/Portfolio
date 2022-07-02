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
      y: 300,
      display: 'block',
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

  const variantss = {
    offscreen: {
      x: -1000,
      display: 'block',
    },
    onscreen: {
      x: 0,
      display: 'block',
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 2,
        
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

        <motion.div variants={variants}>
          <Stack

            w="96"
            spacing={6}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Input p="2" ho type="string" variant="flushed" placeholder="Name" />
            <Input
              p="2"
              type="email"
              variant="flushed"
              placeholder="Enter Email"
            />
            <Textarea p="2" placeholder="Your Message" variant="flushed" />

            <Button margin='50px' type="submit" width="200px" maxW="50%" variant="outline">
              Submit
            </Button>
          </Stack>
        </motion.div>

        <HStack spacing={8}>
          <motion.div
            onClick={() => window.open('https://www.linkedin.com/in/thomas-barreto-50ab71204/')}
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 1.3 }}
          >
            <Icon cursor="pointer" h={10} w={10} as={FaLinkedin} />
          </motion.div>
          <motion.div
            onClick={() => window.open('https://twitter.com/thomasbarreto9')}
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 1.3 }}
          >
            <Icon cursor="pointer" h={10} w={10} as={FaTwitterSquare} />
          </motion.div>
          <motion.div
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
        <motion.div variants={variantss} textAlign="center">
          <Text fontWeight={500} as='em' fontSize='md'>Made in Chakra and Framer Motion by Thomas Barreto</Text>
        </motion.div> 

        
      </Stack>
    </>
  );
};
