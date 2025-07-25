import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <>
      <div className="bg-primary text-primary-content flex justify-between items-center p-4">
        <span className="font-bold text-3xl">ChatKro</span>

        <ul className="flex space-x-4 text-lg items-center">
          <li className="cursor-pointer hover:text-primary-focus transition-colors">
            Home
          </li>
          <li className="cursor-pointer hover:text-primary-focus transition-colors">
            About
          </li>
          <li className="cursor-pointer hover:text-primary-focus transition-colors">
            Chat
          </li>
          <li className="cursor-pointer hover:text-primary-focus transition-colors">
            Login
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
              <option value="slack">Slack</option>
              <option value="soft">Soft</option>
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
