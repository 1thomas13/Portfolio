import { List } from "./components/List";
import { Main } from "./components/Main";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div >
      <Main/>
      <Navbar/>

      <div className="mx-24">
        <List/>
      </div>
    </div>
    
  );
}

export default App;
