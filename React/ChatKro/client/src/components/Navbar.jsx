import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isActive, setIsActive] = useState("home");

  const location = useLocation().pathname;   

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <>
      <div
        className={`${
          location !== "/chat" ? "sticky top-0 z-99" : ""
        } bg-base-100 text-base-content flex justify-between items-center p-4`}
      >
        <Link
          to="/"
          className="font-bold text-3xl font-sans hover:text-primary-focus transition-colors"
          onClick={() => setIsActive("home")}
        >
          ChatKro
        </Link>

        <ul className="flex space-x-4 text-lg items-center">
          <li>
            <Link
              to="/"
              className={`cursor-pointer hover:text-primary-focus transition-colors font-sans ${
                isActive === "home" ? "text-accent" : ""
              }`}
              onClick={() => setIsActive("home")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`cursor-pointer hover:text-primary-focus transition-colors font-sans ${
                isActive === "about" ? "text-accent" : ""
              }`}
              onClick={() => setIsActive("about")}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/chat"
              className={`cursor-pointer hover:text-primary-focus transition-colors font-sans ${
                isActive === "chat" ? "text-accent" : ""
              }`}
              onClick={() => setIsActive("chat")}
            >
              Chat
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`cursor-pointer hover:text-primary-focus transition-colors font-sans ${
                isActive === "contact" ? "text-accent" : ""
              }`}
              onClick={() => setIsActive("contact")}
            >
              Contact
            </Link>
          </li>

          <li>
            <Link to="/login" className="btn btn-accent btn-sm font-sans">
              Login
            </Link>
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
