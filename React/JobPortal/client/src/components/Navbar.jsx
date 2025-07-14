import React, { useState } from "react";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const { user, isAdmin, isRecruiter } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    isRecruiter
      ? navigate("/recruiterDashboard")
      : isAdmin
      ? navigate("/adminDashboard")
      : navigate("/userDashboard");
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="p-3 bg-white text-black flex justify-between md:justify-around items-center sticky top-0 z-99 w-screen">
        <img src={logo} alt="logo" className="h-12" />

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-11 font-sans">
          <NavLink to={"/"} className="text-black hover:text-[#F54677] ">
            Home
          </NavLink>
          <NavLink to={"/about"} className="text-black hover:text-[#F54677]">
            About
          </NavLink>
          <NavLink to={"/jobs"} className="text-black hover:text-[#F54677]">
            Find A Job
          </NavLink>
          <NavLink to={"/contact"} className="text-black hover:text-[#F54677]">
            Contact
          </NavLink>
        </div>

        {user ? (
          <div className="flex gap-3">
            <img
              src={user.photo}
              alt=""
              className="h-10 w-10 object-cover rounded-full"
              onClick={handleClick}
            />
            <button
              className="hidden py-2 border px-4 bg-[#F54677] text-white hover:bg-white hover:text-black rounded-xl md:flex gap-2 justify-center items-center"
              onClick={handleClick}
            >
              {user.firstName + " " + user.lastName}
            </button>
            <button className="md:hidden" onClick={handleMenuClick}>
              <IoMenu className="text-4xl text-[#F54677]" />
            </button>
          </div>
        ) : (
          <>
            <div className="hidden md:flex gap-3">
              <button
                className="py-4 border px-13 bg-[#F54677] text-white hover:bg-white hover:text-black rounded-[20px]"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
              <button
                className="py-4 px-8 border hover:bg-[#F54677] hover:text-white rounded-[20px]"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
            <button className="md:hidden" onClick={handleMenuClick}>
              <IoMenu className="text-4xl text-[#F54677]" />
            </button>
          </>
        )}
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute md:hidden top-18 left-0 right-0 border border-gray-200 p-4 w-full bg-white shadow-lg z-50">
          <ul className="grid gap-4">
            <li onClick={handleMenuClick}>
              <NavLink to={"/"} className="text-black hover:text-[#F54677] ">
                Home
              </NavLink>
            </li>
            <li onClick={handleMenuClick}>
              <NavLink
                to={"/about"}
                className="text-black hover:text-[#F54677]"
              >
                About
              </NavLink>
            </li>
            <li onClick={handleMenuClick}>
              <NavLink to={"/jobs"} className="text-black hover:text-[#F54677]">
                Find A Job
              </NavLink>
            </li>
            <li onClick={handleMenuClick}>
              <NavLink
                to={"/contact"}
                className="text-black hover:text-[#F54677]"
              >
                Contact
              </NavLink>
            </li>
            {!user && (
              <li onClick={handleMenuClick}>
                <NavLink
                  to={"/login"}
                  className="text-black hover:text-[#F54677]"
                >
                  Login / Register
                </NavLink>
              </li>
            )}
            {user && (
              <li onClick={handleMenuClick}>
                <button
                  className="py-2 border px-4 bg-[#F54677] text-white hover:bg-white hover:text-black rounded-xl flex gap-2 justify-center items-center w-full"
                  onClick={handleClick}
                >
                  {user.firstName + " " + user.lastName}
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};
export default Navbar;
