import React, { useState } from 'react';
import { Box, Flex, Heading, Image, Stack, Button } from '@chakra-ui/react';
import {FaGithubSquare} from 'react-icons/fa'; 
import { projects } from '../data';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { GrDomain } from "react-icons/gr";

export const Projects = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedImage);
  return (
    <AnimateSharedLayout type="crossfade">
      <Flex direction="column" as="section" justify="center" align="center">
        <Heading as="h3">Projects</Heading>
        <Flex>
          {projects.map(info => (
            <Stack 
              as={motion.div} 
              whileHover={{ scale: .9 }}
              whileTap={{
                scale: 1,
                
              }} 
            
              padding={3} key={info.id}
            >
              <Image
                as={motion.img}
                layoutId={info.img}
                onClick={() => setSelectedImage(info)}
                cursor="pointer"
                src={info.img}
                maxWidth="800px"
                maxH={128}
                objectFit={'cover'}
                borderRadius={'lg'}
                alt={info.img}
                
              />
              <Heading fontSize={'12px'} color='black' position="absolute">
                {info.title}
              </Heading>
            </Stack>
          ))}
        </Flex>

        <AnimatePresence>
          {selectedImage && (
            <Flex
              alignItems="center"
              as={motion.div}
              backgroundColor="rgba(0,0,0,0.5)"
              justifyContent="center"
              layoutId={selectedImage.img}
              position="fixed"
              top={0}
              left={0}
              height="100%"
              width="100%"
              onClick={() => setSelectedImage(null)}
              
            >
              <Box 
                zIndex={1000}
                bg={'gray.900'}
                borderRadius={'lg'}
                
              >
                <Heading position="absolute">
                  {selectedImage.title}
                </Heading>
                <Image
                  maxWidth="800px"
                  src={selectedImage.img}
                  alt={selectedImage.img}
                />
                <p >

                  lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor
                </p>
                <a href={'/'}>View repo</a>
                <a href={'/'}>View In pagew</a>
                <Button variant='ghost' leftIcon={<FaGithubSquare/>}>View repository</Button>
                <Button variant='ghost' leftIcon={<GrDomain/>}>View page</Button>
              </Box>
            </Flex>
          )}
        </AnimatePresence>
      </Flex>
    </AnimateSharedLayout>
  );
};
