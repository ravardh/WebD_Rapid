import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { FcGoogle } from "react-icons/fc";
import api from "../config/api";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!registerData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!registerData.userName.trim()) {
      newErrors.userName = "Username is required";
    } else if (registerData.userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(registerData.userName)) {
      newErrors.userName =
        "Username can only contain letters, numbers, and underscores";
    }

    if (!registerData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!registerData.password) {
      newErrors.password = "Password is required";
    } else if (registerData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!registerData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      console.log("Form validation failed");
      return;
    }
    console.log("Form is valid, submitting data:", registerData);
    try {
      const res = await api.post("/auth/register", registerData);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-2 text-4xl font-bold text-base-content font-sans">
            Join ChatKro
          </h2>
          <p className="mt-2 text-base-content/70 font-sans">
            Create your account and start chatting
          </p>
        </div>

        {/* Registration Form */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-sans">Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={registerData.fullName}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full font-sans ${
                    errors.fullName ? "input-error" : ""
                  }`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <label className="label">
                    <span className="label-text-alt text-error font-sans">
                      {errors.fullName}
                    </span>
                  </label>
                )}
              </div>

              {/* Username Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-sans">Username</span>
                </label>
                <input
                  type="text"
                  name="userName"
                  value={registerData.userName}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full font-sans ${
                    errors.userName ? "input-error" : ""
                  }`}
                  placeholder="johndoe123"
                />
                {errors.userName && (
                  <label className="label">
                    <span className="label-text-alt text-error font-sans">
                      {errors.userName}
                    </span>
                  </label>
                )}
              </div>

              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-sans">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full font-sans ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error font-sans">
                      {errors.email}
                    </span>
                  </label>
                )}
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-sans">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full font-sans ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error font-sans">
                      {errors.password}
                    </span>
                  </label>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-sans">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full font-sans ${
                    errors.confirmPassword ? "input-error" : ""
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <label className="label">
                    <span className="label-text-alt text-error font-sans">
                      {errors.confirmPassword}
                    </span>
                  </label>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3 flex items-center">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={registerData.agreeToTerms}
                    onChange={handleInputChange}
                    className={`checkbox checkbox-primary ${
                      errors.agreeToTerms ? "checkbox-error" : ""
                    }`}
                  />
                  <span className="label-text font-sans">
                    I agree to the{" "}
                    <a href="#" className="link link-primary">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="link link-primary">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <label className="label">
                    <span className="label-text-alt text-error font-sans">
                      {errors.agreeToTerms}
                    </span>
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary btn-block font-sans"
                >
                  Create Account
                </button>
              </div>
            </form>

           
            {/* Login Link */}
            <div className="text-center mt-2">
              <p className="text-base-content/70 font-sans">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary font-sans">
                  Sign in here
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

export default RegisterPage;
