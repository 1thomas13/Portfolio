import React from 'react';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Main } from './components/Main';
import { NavBar } from './components/NavBar';
import { Contact } from './components/Contact';

function App() {
  return (
    <>
      <NavBar/>
      <Main/>
      <About/>
      <Projects/>
      <Contact/>
    </>
  );
}

export default App;
