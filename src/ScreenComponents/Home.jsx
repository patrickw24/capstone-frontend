import React from 'react'
import { LoginForm } from '../Components/LoginForm'

export const Home = ({setLogin}) => {
  return (
    <div><LoginForm setLogin={setLogin}/></div>
  )
}
