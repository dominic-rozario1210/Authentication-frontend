
import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const formik = useFormik({
        initialValues: {
            email: ""
        },

        validationSchema: yup.object({
            email: yup
                .string()
                .email("Enter a valid email")
                .required("Email is required")
        }),

        onSubmit: async (values) => {
            try {
                const response = await axios.post(
                    "/forgot-password",
                    values
                );

                toast.success(response.data.message);
                formik.resetForm();
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Unable to send reset email"
                );
            }
        }
    });

    return (
        <div className="auth-page">
            <div className="auth-form">
                <h2>Forgot Password</h2>
                <p>Enter your registered email to reset your password.</p>

                <form onSubmit={formik.handleSubmit}>
                    <div className="auth-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.email &&
                            formik.errors.email && (
                                <p className="error">
                                    {formik.errors.email}
                                </p>
                            )}
                    </div>

                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting
                            ? "Sending..."
                            : "Send Reset Link"}
                    </button>
                </form>
                <div className="auth-footer">
                    <p>
                        Remember your password?{" "}
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
