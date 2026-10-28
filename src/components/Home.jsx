import React from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = ({isLoggedIn,setIsLoggedIn}) => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);

        toast.success(
            "Logged out successfully",
            {
                position:"top-right",
                autoClose:3000
            }
        );
    };
  return (
    <>
      <div className='navbar'>
        <h2>Demo</h2>
        <div className='nav-link'>
            {
                isLoggedIn ?
                 <>
                   <Link to="/profile">
                      <button>Profile</button>
                    </Link>
                   <button onClick={handleLogout}>Logout</button>
                 </>
                 :
                 <>
                   <Link to="/login">
                       <button>Login</button>
                   </Link>
                   <Link to="/register">
                       <button>Register</button>
                   </Link>
                 </>
            }
        </div>

      </div>
    </>
  )
}

export default Home
