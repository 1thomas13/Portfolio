import AboutMe from "./components/AboutMe";
import { Contact } from "./components/Contact";
import { List } from "./components/List";
import { Main } from "./components/Main";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div >
      <Main/>
      <Navbar/>
      <AboutMe/>
      <div className="mx-24">
        <List/>
      </div>
      <Contact/>
    </div>
    
  );
}

export default App;
