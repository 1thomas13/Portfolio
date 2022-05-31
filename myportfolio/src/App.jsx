import AboutMe from "./components/AboutMe";
import { BrowserRouter as Router, Route,Routes,useParams  } from "react-router-dom"
import { Contact } from "./components/Contact";
import { List } from "./components/List";
import { Main } from "./components/Main";
import { Navbar } from "./components/Navbar";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion"
import { Project } from "./components/Project";
import { Footer } from "./components/Footer";

function Store({ match }) {
 
  const {id} = useParams();
  
  console.log(id)

  return (
    <>
      <List selectedId={id} />

      <AnimatePresence>
        {id && <Project id={id} key="item" />}
      </AnimatePresence>
    </>
  );
}


function App() {
  
  
 


  return (
    <div>
      
        <Main/>
        <Navbar/>
        <AboutMe/>
        <div >
          <Router>
            <Routes>
              <Route path="/" element={<Store />}/>
              <Route path="/:id" element={<Store />}/>
            </Routes>
          </Router>
        
        </div>
        <Contact/>
        <Footer/>
    </div>
    
  );
}

export default App;
