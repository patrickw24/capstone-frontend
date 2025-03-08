
import { Navbar } from './Components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import './App.css'

function App() {
  

  return (
   <>
    <BrowserRouter> 
    <Routes>
      <Route path='/' element={<Navbar/>}/>
    </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
