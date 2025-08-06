import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { user, islogin } = useAuth();

  const location = useLocation().pathname.slice(1);

  const [isActive, setIsActive] = useState(location);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <>
      <div
        className={`${
          location !== "chat" ? "sticky top-0 z-50" : ""
        } bg-base-100/70 text-base-content flex justify-between items-center px-8 py-3 rounded-xl shadow-lg backdrop-blur-md  border border-base-200 transition-all duration-300`}
        style={{
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Link
          to="/"
          className="font-bold text-3xl font-sans bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg tracking-tight hover:scale-105 transition-transform duration-200"
          onClick={() => setIsActive("")}
        >
          ChatKro
        </Link>

        <ul className="flex space-x-6 text-lg items-center">
          <li>
            <Link
              to="/"
              className={`relative cursor-pointer font-sans px-2 py-1 transition-colors duration-200 ${
                isActive === "" ? "text-accent" : "hover:text-primary-focus"
              } group`}
              onClick={() => setIsActive("")}
            >
              Home
              <span
                className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full"
                style={{
                  display: isActive === "" ? "block" : undefined,
                  transform: isActive === "" ? "scaleX(1)" : undefined,
                }}
              ></span>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`relative cursor-pointer font-sans px-2 py-1 transition-colors duration-200 ${
                isActive === "about"
                  ? "text-accent"
                  : "hover:text-primary-focus"
              } group`}
              onClick={() => setIsActive("about")}
            >
              About
              <span
                className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full"
                style={{
                  display: isActive === "about" ? "block" : undefined,
                  transform: isActive === "about" ? "scaleX(1)" : undefined,
                }}
              ></span>
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className={`relative cursor-pointer font-sans px-2 py-1 transition-colors duration-200 ${
                isActive === "contact"
                  ? "text-accent"
                  : "hover:text-primary-focus"
              } group`}
              onClick={() => setIsActive("contact")}
            >
              Contact
              <span
                className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full"
                style={{
                  display: isActive === "contact" ? "block" : undefined,
                  transform: isActive === "contact" ? "scaleX(1)" : undefined,
                }}
              ></span>
            </Link>
          </li>

          <li>
            {islogin && user ? (
              <Link
                to="/chat"
                className="flex justify-center items-center gap-3"
              >
                <img
                  src={user.profilePic}
                  alt="ProfilePic"
                  className="h-8 w-8 rounded-full object-cover"
                  onError={(e) => {
                    console.log(
                      "Main user image failed to load:",
                      user.profilePic
                    );
                    e.target.src = `https://placehold.co/600x400/?text=${user.fullName
                      .charAt(0)
                      .toUpperCase()}`;
                  }}
                />

                <span>{user.fullName} </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="font-sans px-4 py-1.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Login
              </Link>
            )}
          </li>
          <li>
            <select
              value={theme}
              onChange={handleThemeChange}
              className="select select-bordered select-sm bg-base-100 text-base-content"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="gourmet">Gourmet</option>
              <option value="corporate">Corporate</option>
              <option value="ghibli">Ghibli</option>
              <option value="luxury">Luxury</option>
              <option value="pastel">Pastel</option>
              <option value="slack">Slack</option>
              <option value="soft">Soft</option>
              <option value="spotify">Spotify</option>
              <option value="valorant">Valorant</option>
              <option value="vscode">VSCode</option>
            </select>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
