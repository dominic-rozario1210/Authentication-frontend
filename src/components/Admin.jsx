import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Admin = () => {

    const navigate = useNavigate();

    const[isLoading,setIsLoading] = useState(true);
    const[activePage,setActivePage] = useState("Dashboard");

    const menuItems =[
        "Dashboard",
        "Users",
        "Reports",
        "settings"
    ];

    useEffect(() => {
        const verifyAdmin = async () => {
            
            const token =localStorage.getItem("token");

            if(!token){
                navigate("/login",{replace:true})
                return;
            }

            try {
                await axios.get("/verify-admin",{
                    headers:{
                        authorization: `Bearer ${token}`
                    }
                })
            } catch (error) {
                toast.error(
                    error.response?.data?.message || "Unable to verify Admin access"
                )

                if(error.response?.status === 401){
                    localStorage.removeItem("token")
                    navigate("/login",{replace:true})
                }else{
                    navigate("/",{replace:true})
                }
            } finally{
                setIsLoading(false)
            }
        }

        verifyAdmin();
    },[navigate])


    if (isLoading) {
      return <div className="loading-page">
                <div className='spinner'></div>
                <h2>  Loading dashboard...</h2>
             </div>;
    }
  return (
    <div className="admin-layout">
    <aside className="admin-sidebar">
      <h2>Admin Panel</h2>

      <nav>
        {menuItems.map((item) => (
          <button
            key={item}
            className={
              activePage === item ? "menu-item active" : "menu-item"
            }
            onClick={() => setActivePage(item)}
          >
            {item === "settings"
              ? "Settings"
              : item}
          </button>
        ))}
      </nav>
    </aside>

    <main className="admin-main">
      <header className="admin-header">
        <h3>{activePage === "settings" ? "Settings" : activePage}</h3>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </header>

      {activePage === "Dashboard" && (
        <section className="dashboard-content">
          <h1>Dashboard</h1>
          <p>Welcome to the Admin Dashboard.</p>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h4>Total Users</h4>
              <h2>50</h2>
            </div>

            <div className="dashboard-card">
              <h4>Active Users</h4>
              <h2>5</h2>
            </div>

            <div className="dashboard-card">
              <h4>Total Reports</h4>
              <h2>—</h2>
            </div>
          </div>
        </section>
      )}

      {activePage === "Users" && (
        <section className="dashboard-content">
          <h1>Users</h1>
          <p>We will connect this page to your users API next.</p>
        </section>
      )}

      {activePage === "Reports" && (
        <section className="dashboard-content">
          <h1>Reports</h1>
          <p>Report management will be added here.</p>
        </section>
      )}

      {activePage === "settings" && (
        <section className="dashboard-content">
          <h1>Settings</h1>
          <p>Admin settings will be added here.</p>
        </section>
      )}
    </main>
  </div>
  )
}

export default Admin
