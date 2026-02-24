import './App.css';

import Posiciones from "./components/Posiciones";
import  Header  from "./components/Header";

function App() {
  

  return (
    <>
      <Header/>
      <div className='pt-32'><Posiciones/></div>
    </>
    
  )
}

export default App
