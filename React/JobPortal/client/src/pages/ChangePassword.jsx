import React, { useState } from "react";
import axios from "../config/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [forgotData, setForgotData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    cfNewPassword: "",
  });

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (!isEmailSent) {
        const res = await axios.post("/auth/generateOTP", {
          email: forgotData.email,
        });
        setIsEmailSent(true);
        toast.success(res.data.message);
      } else if (!isOtpVerified) {
        const res = await axios.post("/auth/verifyOTP", {
          email: forgotData.email,
          otp: forgotData.otp,
        });
        setOtpVerified(true);
        toast.success(res.data.message);
      } else if (isEmailSent && isOtpVerified) {
        if (forgotData.cfNewPassword === forgotData.newPassword) {
          const res = await axios.patch("/auth/changePassword", {
            email: forgotData.email,
            password: forgotData.newPassword,
          });
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error("New Password and Confirm Password Not Match");
        }
      }
    } catch (error) {
      toast.error(
        `Error ${error?.response?.status || "503"} : ${
          error?.response?.data?.message || "Service Unavailable"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForgotData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-[89vh] p-10 flex items-center justify-center bg-gradient-to-r from-pink-200 to-blue-200">
      <div className="w-full max-w-md bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-[#1A3C5A] text-center mb-2">
          Forgot Password
        </h1>

        <div>
          <label
            htmlFor="email"
            className="block text-lg font-semibold text-[#1A3C5A] mb-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={forgotData.email}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white  disabled:bg-gray-100"
            onChange={handleChange}
            placeholder="Enter you Email"
            disabled={isEmailSent}
          />
        </div>
        <div>
          <label
            htmlFor="otp"
            className="block text-lg font-semibold text-[#1A3C5A] mb-1"
          >
            OTP
          </label>
          <input
            type="text"
            name="otp"
            value={forgotData.otp}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white disabled:bg-gray-100"
            onChange={handleChange}
            placeholder="Enter OTP sent on Email"
            disabled={!isEmailSent || isOtpVerified}
          />
        </div>

        {isOtpVerified && (
          <>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-lg font-semibold text-[#1A3C5A] mb-1"
              >
                New Password
              </label>
              <input
                type="text"
                name="newPassword"
                value={forgotData.newPassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white disabled:bg-gray-100"
                onChange={handleChange}
                placeholder="Enter New Password"
              />
            </div>
            <div>
              <label
                htmlFor="cfNewPassword"
                className="block text-lg font-semibold text-[#1A3C5A] mb-1"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                name="cfNewPassword"
                value={forgotData.cfNewPassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white disabled:bg-gray-100"
                onChange={handleChange}
                placeholder="Confirm New Password"
              />
            </div>
          </>
        )}
        <button
          className="w-full py-3 bg-[#1A3C5A] text-white font-bold rounded-lg hover:bg-[#FF4081] transition-colors duration-200"
          onClick={handleClick}
        >
          {isLoading
            ? "Loading ..."
            : isEmailSent
            ? isOtpVerified
              ? "Change Password"
              : "Verify OTP"
            : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
