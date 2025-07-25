import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log("Registration attempt:", formData);
      // Add registration logic here
    } else {
      setErrors(newErrors);
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
              {/* Name Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-sans">First Name</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`input input-bordered w-full font-sans ${
                      errors.firstName ? "input-error" : ""
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <label className="label">
                      <span className="label-text-alt text-error font-sans">
                        {errors.firstName}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-sans">Last Name</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`input input-bordered w-full font-sans ${
                      errors.lastName ? "input-error" : ""
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <label className="label">
                      <span className="label-text-alt text-error font-sans">
                        {errors.lastName}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-sans">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
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
                  value={formData.password}
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
                  value={formData.confirmPassword}
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
                    checked={formData.agreeToTerms}
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

            {/* Divider */}
            <div className="divider font-sans">Or sign up with</div>

            {/* Social Registration */}
            
              <button className="btn btn-outline font-sans flex items-center justify-center m-2">
                <FcGoogle className="text-xl" />
                Continue with Google
              </button>
            

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
