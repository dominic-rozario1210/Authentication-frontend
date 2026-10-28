import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Profile = () => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getProfile = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                setIsLoading(false);
                return
            }

            try {
                const response = await axios.get("/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(response.data.user);

            } catch (error) {
                toast.error(error.response?.data?.message || "failed to fetch profile")

            } finally {
                setIsLoading(false)
            }
        }
        getProfile();
    }, []);

    if (isLoading) {
        return (
            <div className="auth-page">
                <div className="auth-form">
                    <h2>Loading Profile</h2>
                </div>
            </div>
        );
    }

    
    if (!user) {
        return (
            <div className="auth-page">
                <div className="auth-form">
                    <h2>Unable to load profile</h2>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div className='profile-card'>
                <h1>My Profile</h1>
                <div className='profile-info'>
                    <div className='profile-content'>
                        <h4>Name</h4>
                        <p>{user.name}</p>
                    </div>
                    <div className='profile-content'>
                        <h4>email</h4>
                        <p>{user.email}</p>
                    </div>
                    <div className='profile-content'>
                        <h4>Role</h4>
                        <p>{user.role}</p>
                    </div>
                </div>

            </div>
            

        </div>
    )
}

export default Profile
