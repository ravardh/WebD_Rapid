import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { state } from "../../public/dummy";

import axios from "../config/api";

const state = ["Delhi", "MP", "Haryana", "Chandigarh", "Kolkalta"];
const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    address: "",
    password: "",
    cfpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // const name = e.target.name;
    // const value = e.target.value;        shorter way to write instead of these 2 lines

    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registered Data:", registerData);

    try {
      const res = await axios.post("/auth/register", registerData);

       toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="h-full p-10 flex items-center justify-center bg-gradient-to-r from-pink-200 to-blue-200">
        <div className="w-full max-w-3xl min-h-fit bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col gap-8">
          <h1 className="text-4xl font-bold text-[#1A3C5A] text-center mb-2">
            Register
          </h1>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex gap-3 ">
              <div className="flex items-center gap-5 ">
                <label className="min-w-fit text-lg font-semibold text-[#1A3C5A] mb-1">
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-[14.7rem] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white"
                  onChange={handleChange}
                  value={registerData.firstName}
                />
              </div>

              <div className="flex items-center gap-5">
                <label className="min-w-fit text-lg font-semibold text-[#1A3C5A] mb-1">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="w-[14.7rem] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white"
                  onChange={handleChange}
                  value={registerData.lastName}
                />
              </div>
            </div>

            <div className="flex items-center gap-10">
              <label
                htmlFor="email"
                className="min-w-fit text-lg font-semibold text-[#1a3c5a] mb-1"
              >
                Email ID:
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white"
                onChange={handleChange}
                value={registerData.email}
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-7">
                <label
                  htmlFor="phone"
                  className="min-w-fit text-lg font-semibold text-[#1a3c5a] mb-1"
                >
                  Phone No:
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-[16.7rem] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white"
                  onChange={handleChange}
                  value={registerData.phone}
                />
              </div>

              <div className="flex items-center gap-[1.2rem]">
                <label
                  htmlFor="state"
                  className="min-w-fit text-lg font-semibold text-[#1a3c5a] mb-1"
                >
                  State:
                </label>
                <select
                  name="state"
                  className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white w-[14.5rem] px-4 py-2"
                  onChange={handleChange}
                  value={registerData.state}
                >
                  <option value="">Select State</option>
                  {state.length ? (
                    state.map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))
                  ) : (
                    <option value="">--No state Found--</option>
                  )}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-12">
              <label
                htmlFor="address"
                className="min-w-fit text-lg font-semibold text-[#1a3c5a] mb-1"
              >
                Address
              </label>
              <textarea
                name="address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white"
                rows="3"
                onChange={handleChange}
                value={registerData.address}
              ></textarea>
            </div>

            <div className="flex items-center gap-8">
              <label
                htmlFor="password"
                className="min-w-fit text-lg font-semibold text-[#1A3C5A] mb-1"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white"
                onChange={handleChange}
                value={registerData.password}
              />
            </div>

            <div className="flex items-center gap-8">
              <label
                htmlFor="cfpassword"
                className="min-w-fit text-lg font-semibold text-[#1A3C5A] mb-1"
              >
                Confirm <br /> Password:
              </label>
              <input
                type="password"
                name="cfpassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white"
                onChange={handleChange}
                value={registerData.cfpassword}
              />
            </div>

            <button
              type="createAccount"
              className="w-full py-3 bg-[#1A3C5A] text-white font-bold rounded-lg hover:bg-[#FF4081] transition-colors duration-200"
            >
              Create Account
            </button>

            <button
              type="reset"
              className="w-full py-3 bg-white border border-[#1A3C5A] text-[#1A3C5A] font-bold rounded-lg hover:bg-[#FF4081] hover:text-white transition-colors duration-200"
            >
              Reset
            </button>
          </form>

          <div className="text-center mt-2">
            <button
              className="text-[#FF4081] hover:underline font-semibold"
              onClick={() => navigate("/Login")}
            >
              Already have an account? / Login Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
