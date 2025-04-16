
import './App.css'

import Rutas from './Router/Rutas'
import { ToastContainer} from 'react-toastify';

function App() {


  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={5000}
      />
        <Rutas/>
    </>  
  )
}

export default App
