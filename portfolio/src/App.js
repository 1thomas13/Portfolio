import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Heading
} from '@chakra-ui/react';
import { NavBar } from './NavBar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar/>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          
          <Heading
            as='h1'
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='6xl'
            fontWeight='extrabold'
          >
            Thomas Barreto Web Developer
          </Heading>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
