import react, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    Userid: "", //way of initializing the name components or input types present in the page
    Password: "",
  });

  const handleChange = (e) => {  //every time i am writing anything in the input the function is called and everything is stored
    const {name, value} = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value })); //...prev thing 
  };

  const handleSubmit = (e) => {
    e.preventDefault();//stops that specific part of the page from reloading
    console.log("Form submitted:", loginData);
  };
  

  return (
    <div className="h-full p-10 flex items-center justify-center bg-gradient-to-r from-pink-200 to-blue-200">
      <div className="w-full max-w-md bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-[#1A3C5A] text-center mb-2">
          Login
        </h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="UserID"
              className="block text-lg font-semibold text-[#1A3C5A] mb-1"
            >
              User ID
            </label>
            <input
              type="text"
              name="Userid"
              value={loginData.Userid}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-[#1A3C5A] mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="Password"
              value={loginData.Password}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememMe"
              className="h-4 w-4 accent-[#FF4081]"
            />
            <label htmlFor="rememMe" className="text-sm text-gray-500">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#1A3C5A] text-white font-bold rounded-lg hover:bg-[#FF4081] transition-colors duration-200"
          >
            Login
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
            onClick={() => navigate("/Register")}
          >
            Not Registered? / Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;