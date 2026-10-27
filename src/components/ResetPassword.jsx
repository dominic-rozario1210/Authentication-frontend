
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [isValidToken, setIsValidToken] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await axios.get("/verify-token", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setIsValidToken(true);
            } catch (error) {
                setIsValidToken(false);

                toast.error(
                    error.response?.data?.message ||
                    "Invalid or expired reset link"
                );
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: ""
        },

        validationSchema: yup.object({
            newPassword: yup
                .string()
                .min(6, "Password must be at least 6 characters")
                .required("New password is required"),

            confirmPassword: yup
                .string()
                .oneOf(
                    [yup.ref("newPassword")],
                    "Passwords do not match"
                )
                .required("Confirm your password")
        }),

        onSubmit: async (values) => {
            try {
                const response = await axios.put(
                    "/change-password",
                    {
                        newPassword: values.newPassword
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                toast.success(response.data.message);
                formik.resetForm();
                navigate("/login");
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Unable to reset password"
                );
            }
        }
    });

    if (isLoading) {
        return (
            <div className="auth-page">
                <div className="auth-form">
                    <h2>Verifying reset link...</h2>
                </div>
            </div>
        );
    }

    if (!isValidToken) {
        return (
            <div className="auth-page">
                <div className="auth-form">
                    <h2>Invalid or expired link</h2>
                    <p>Please request a new password reset link.</p>
                    <Link to="/forgot-password">
                        Request New Link
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-form">
                <h2>Reset Password</h2>
                <p>Enter your new password below.</p>

                <form onSubmit={formik.handleSubmit}>
                    <div className="auth-group">
                        <label htmlFor="newPassword">
                            New Password
                        </label>

                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter new password"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.newPassword &&
                            formik.errors.newPassword && (
                                <p className="error">
                                    {formik.errors.newPassword}
                                </p>
                            )}
                    </div>

                    <div className="auth-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword && (
                                <p className="error">
                                    {formik.errors.confirmPassword}
                                </p>
                            )}
                    </div>

                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting
                            ? "Updating..."
                            : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
