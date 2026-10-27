import React, { useState } from 'react'
import Register from './components/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { ToastContainer } from 'react-toastify';
import "./App.css"

const App = () => {

  const status = localStorage.getItem("isLoggedIn");

  const[isLoggedIn,setIsLoggedIn] = useState(status === "true")

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    },
    {
      path:"/register",
      element:<Register setIsLoggedIn={setIsLoggedIn}/>
    },
    {
      path:"/login",
      element:<Login setIsLoggedIn={setIsLoggedIn}/>
    },
    {
      path:"/forgot-password",
      element:<ForgotPassword/>
    },
    {
      path:"/reset-password/:token",
      element:<ResetPassword/>
    }
    
  ])
  return (
    <div>
      <RouterProvider router={router}/>
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
      
        
    </div>
  )
}

export default App
