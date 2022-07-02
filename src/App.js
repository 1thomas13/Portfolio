import React from 'react';
import { Projects } from './components/Projects';
import { Main } from './components/Main';
import { NavBar } from './components/NavBar';
import { Contact } from './components/Contact';

function App() {
  return (
    <>
      <NavBar/>
      
      <Main/>
      <Projects/>
      <Contact/>
    </>
  );
}

export default App;
