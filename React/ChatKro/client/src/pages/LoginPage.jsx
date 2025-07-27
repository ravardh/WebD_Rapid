import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { FcGoogle } from "react-icons/fc";
import api from "../config/api";
import toast from "react-hot-toast";
import { useGoogleAuth } from "../config/googleAuth";

const LoginPage = () => {
  const { theme } = useTheme();
  const { isLoading, error, isInitialized, signInWithGoogle } = useGoogleAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login data submitted:", loginData);

    try {
      const res = await api.post("/auth/login", loginData);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleSuccess = async (userData) => {
    try {
      console.log("Google login success:", userData);
      const res = await api.post("/auth/googleLogin", userData);
      toast.success(res.data.message);
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
    toast.error("Google login failed. Please try again.");
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle(handleGoogleSuccess, handleGoogleFailure);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-bold text-base-content font-sans">
            Welcome Back
          </h2>
          <p className="mt-2 text-base-content/70 font-sans">
            Sign in to your ChatKro account
          </p>
        </div>

        {/* Login Form */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-sans">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  className="input input-bordered w-full font-sans"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-sans">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  className="input input-bordered w-full font-sans"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Remember Me */}
              <div className="form-control flex items-center justify-between">
                <label className="label cursor-pointer justify-start gap-1 flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleInputChange}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text font-sans">Remember me</span>
                </label>
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover font-sans"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary btn-block font-sans"
                >
                  Sign In
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="divider font-sans">Or continue with</div>

            {/* Google Login */}
            {error ? (
              <button
                className="btn btn-outline btn-error font-sans flex items-center justify-center gap-2 m-2 w-full"
                disabled
              >
                <FcGoogle className="text-xl" />
                {error}
              </button>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline font-sans flex items-center justify-center gap-2 m-2 w-full"
                disabled={!isInitialized || isLoading}
              >
                <FcGoogle className="text-xl" />
                {isLoading
                  ? "Loading..."
                  : isInitialized
                  ? "Continue with Google"
                  : "Google Auth Error"}
              </button>
            )}

            {/* Sign Up Link */}
            <div className="text-center mt-2">
              <p className="text-base-content/70 font-sans">
                Don't have an account?{" "}
                <Link to="/register" className="link link-primary font-sans">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Theme Demo */}
        <div className="text-center">
          <p className="text-sm text-base-content/50 font-sans">
            Currently using{" "}
            <span className="font-semibold capitalize">{theme}</span> theme
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
