import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import * as yup from "yup";

const Login = ({ setIsLoggedIn }) => {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            password: "",
            email: ""
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .required("Email is required"),
            password: yup
                .string()
                .min(6, "required atleast 6 characters")
                .required("password is required")
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const response = await axios.post("/login", values);
                toast.success(response.data.message);
                // localStorage.setItem("isLoggedIn", "true")

                localStorage.setItem("token", response.data.token)
                setIsLoggedIn(true);
                formik.resetForm();
                navigate("/")
            } catch (error) {
                toast.error(error.response?.data?.message || "login failed")
            } finally {
                setIsLoading(false)
            }
        }


    })
    if (isLoading) {
    return (
        <div className="loading-page">
            <div className="spinner"></div>
            <h2>Logging you in...</h2>
            <p>Please wait while we verify your credentials.</p>
        </div>
    );
}
    return (
        <div className='auth-page'>
            <div className='auth-form'>
                <h2>Login</h2>
                <p>Login to your Account</p>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className='auth-group'>
                        <label htmlFor="email">Email</label>
                        <input type="text"
                            name="email"
                            id="email"
                            placeholder='Enter your email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email &&
                            formik.errors.email && (
                                <p className="error" >
                                    {formik.errors.email}
                                </p>
                            )}
                    </div>
                    <div className='auth-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            placeholder='Enter your Password'
                            id='password'
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}

                        />
                        {formik.touched.password &&
                            formik.errors.password && (
                                <p className="error" >
                                    {formik.errors.password}
                                </p>
                            )}
                    </div>
                    <button type="submit" disabled={isLoading}>
                       Login
                    </button>
                </form>
                <div className='auth-footer'>
                    <p>
                        Dont have an Account ?
                        <Link to="/register">Register</Link>
                    </p>

                </div>
                <div className='forgot-pass'>
                    <Link to="/forgot-password">Forgot Password</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
