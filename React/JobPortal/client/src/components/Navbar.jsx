import React from "react";
import logo from "../assets/image.png";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  
  const navigate = useNavigate();

  return (
    <>
      <div className="p-5 bg-white text-black flex justify-center gap-70 items-center sticky top-0 z-99 w-screen">
        <img src={logo} alt="logo" className="h-15" />
        <div className="flex gap-11 font-sans">
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
        <div className="flex gap-3">
          <button className="py-4 border px-13 bg-[#F54677] text-white hover:bg-white hover:text-black rounded-[20px]" onClick={()=>navigate("/register")}>
            Register
          </button>
          <button className="py-4 px-8 border hover:bg-[#F54677] hover:text-white rounded-[20px]"onClick={()=>navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};
export default Navbar;