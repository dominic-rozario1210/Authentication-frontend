import React, { useEffect, useState } from 'react'
import Register from './components/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { ToastContainer } from 'react-toastify';
import "./App.css"
import axios from 'axios';
import Profile from './components/Profile';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {

  // const status = localStorage.getItem("isLoggedIn");

  // const[isLoggedIn,setIsLoggedIn] = useState(status === "true")

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return
      }

      try {
        await axios.get("/verify-token", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
         setIsLoggedIn(true);

      } catch (error) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false)
      }

    }

    verifyToken();
  },[])

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
  //   },
  //   {
  //     path: "/register",
  //     element: <Register setIsLoggedIn={setIsLoggedIn} />
  //   },
  //   {
  //     path: "/login",
  //     element: <Login setIsLoggedIn={setIsLoggedIn} />
  //   },
  //   {
  //     path: "/forgot-password",
  //     element: <ForgotPassword />
  //   },
  //   {
  //     path: "/reset-password/:token",
  //     element: <ResetPassword />
  //   },
  //   {
  //     path:"/profile",
  //     element:<Profile/>
  //   }

  // ])
   const router = createBrowserRouter([
    {
      path:"/",
      element:<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    },
    {
      path:"/register",
      element:(
        <PublicRoute isLoggedIn={isLoggedIn}>
          <Register/>
        </PublicRoute>
      )
    },
    {
      path:"/login",
      element:(
        <PublicRoute isLoggedIn={isLoggedIn}>
          <Login setIsLoggedIn={setIsLoggedIn}/>
        </PublicRoute>
      )
    },
    {
      path:"/forgot-password",
      element:(
        <PublicRoute isLoggedIn={isLoggedIn}>
          <ForgotPassword/>
        </PublicRoute>
      )
    },
     {
      path:"/reset-password",
      element:(
        <PublicRoute isLoggedIn={isLoggedIn}>
          <ResetPassword/>
        </PublicRoute>
      )
    },
    {
      path:"/profile",
      element:(
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <Profile/>
        </ProtectedRoute>
      )
    }
   ])
   
  if (isLoading) {
    return (
      <div className="auth-page">
        <div className="auth-form">
          <h2>Checking login status...</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />


    </div>
  )
}

export default App
