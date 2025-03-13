import { Home } from './ScreenComponents/Home'
import { Menu } from './Components/Menu'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register } from './ScreenComponents/Register'
import { Posts } from './ScreenComponents/Posts'
import { useState, useEffect } from 'react'
import { NotFound } from './Components/NotFound'
import { Wall } from './Components/Wall'
import './index.css' 




function App() {
  
  const [isLogin, setLogin] = useState(false)

  let token= ""
  const baseUrl= import.meta.env.VITE_BASE_URL
  const endPoint = "/validatesession"

  const validateToken = async()=>{
    const url= `${baseUrl}${endPoint}`
    console.log(url)
    const result = await fetch(url,{
      method: "POST",
      headers: {
        'Authorization' : token,
        'Content-Type': 'application/json'
      }
    })

    if(result.ok){
      setLogin(true)
    }else{
      setLogin(false)
    }
  }

  useEffect(()=>{
    token = window.localStorage.getItem("social-credential")
    console.log(token)
    validateToken()
  },[])
  
  

  return (
   <>
    <BrowserRouter> 
    { isLogin ? <Menu/>: ""}
    <Routes>
      <Route path="/" element={<Home/>}/>
     {!isLogin ? <Route path="/register" element={<Register/>}/> : ""}
      <Route path="*" element={<NotFound/>}/>
     { isLogin ? <Route path="/posts" element={<Posts/>}/> : ""}

    </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
