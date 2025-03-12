import { Home } from './ScreenComponents/Home'
import { Navbar } from './Components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register } from './ScreenComponents/Register'
import { Posts } from './ScreenComponents/Posts'
import { useState, useEffect } from 'react'




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
    validateToken()
  },[])
  

  return (
   <>
    <BrowserRouter> 
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
     { !isLogin ? <Route path="/posts" element={<Posts/>}/> : ""}
    </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
