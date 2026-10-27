import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import * as yup from "yup";

const Register = ({ setIsLoggedIn }) => {

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            name: yup
                .string()
                .required("Name is required"),
            email: yup
                .string()
                .required("Email is required"),
            password: yup
                .string()
                .min(6, "Required atleast 6 characters")
                .required("password is required")
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post("/register", values);
                toast.success(response.data.message);
                localStorage.setItem("isLoggedIn", "true");
                setIsLoggedIn(true);
                formik.resetForm();
                navigate("/");
            } catch (error) {
                toast.error(error.response?.data?.message || "registration failed")
            }
        }
    })
    return (
        <div className='auth-page'>
            <div className='auth-form'>
                <h2>Register</h2>
                <p>Create your account</p>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className='auth-group'>
                        <label htmlFor="name">Name</label>
                        <input type="text"
                            name="name"
                            placeholder='Enter your name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {
                            formik.touched.name && formik.errors.name && (
                                <p className="error">
                                    {formik.errors.name}
                                </p>
                            )
                        }
                    </div>
                    <div className='auth-group'>
                        <label htmlFor="">Email</label>
                        <input type="text"
                            name="email"
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
                        <label htmlFor="">Password</label>
                        <input type="password"
                            name="password"
                            placeholder='Enter your password'
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
                    <button type='submit' >Register</button>
                </form>
                <div className='auth-footer'>
                    <p>
                        Already have an account?
                        <Link to="/login">Login</Link>

                    </p>
                </div>

            </div>

        </div>
    )
}

export default Register
