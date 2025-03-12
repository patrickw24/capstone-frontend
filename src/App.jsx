import { Home } from './ScreenComponents/Home'
import { Navbar } from './Components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register } from './ScreenComponents/Register'




function App() {
  

  return (
   <>
    <BrowserRouter> 
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
