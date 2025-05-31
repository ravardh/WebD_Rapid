import React from "react";
import photo from "../assets/profile.jpg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="container-fluid bg-danger text-white w-100 h-100">
        <div className="text-center pt-2">
          <img
            src={photo}
            alt=""
            style={{ width: "60%", height: "70%" }}
            className="rounded-circle object-fit-cover border border-3 p-1"
          />

          <h2>Raj Vardhan</h2>
        </div>

        <div className="pt-5">
          <ul className=" list-unstyled fs-4 ps-5">
            <li>
              <Link to={"/"} className="text-decoration-none text-white" >
                <i class="bi bi-house-door-fill"></i> Home
              </Link>
            </li>
            <li>
              <Link to={"/about"} className="text-decoration-none text-white">
                <i class="bi bi-file-person-fill"></i> About
              </Link>
            </li>
            <li>
              <Link
                to={"/education"}
                className="text-decoration-none text-white"
              >
                <i class="bi bi-mortarboard-fill"></i> Education
              </Link>
            </li>
            <li>
              <Link to={"/project"} className="text-decoration-none text-white">
                <i class="bi bi-person-fill-gear"></i> Projects
              </Link>
            </li>
            <li>
              <Link
                to={"/certification"}
                className="text-decoration-none text-white"
              >
                <i class="bi bi-patch-check-fill"></i> Certification
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="text-decoration-none text-white">
                <i class="bi bi-person-lines-fill"></i> Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
