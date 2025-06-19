import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/api";
import toast from "react-hot-toast";
import Loading from "../assets/infinite-spinner.svg";
import { IoEyeOff, IoEye } from "react-icons/io5";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "", //way of initializing the name components or input types present in the page
    password: "",
  });

  const handleChange = (e) => {
    //every time i am writing anything in the input the function is called and everything is stored
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value })); //...prev thing
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //stops that specific part of the page from reloading
    setLoading(true);
    console.log("Form submitted:", loginData);
    try {
      const res = await axios.post("/auth/login", loginData);
      toast.success(res.data.message);
      navigate("/userDashboard")
    } catch (error) {
      toast.error(
        `Error ${error?.response?.status || "503"} : ${
          error?.response?.data?.message || "Service Unavailable"
        }`
      );
    } finally {
      setLoading(false);
    }
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
              htmlFor="email"
              className="block text-lg font-semibold text-[#1A3C5A] mb-1"
            >
              User ID
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-[#1A3C5A] mb-1"
            >
              password
            </label>
            <div className="relative flex items-center">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={loginData.password}
                className=" w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white"
                onChange={handleChange}
              />
              <span
                className="absolute right-1 border-s-2 border-gray-100 p-1 bg-white"
                onClick={(e) => {
                  passwordVisible
                    ? setPasswordVisible(false)
                    : setPasswordVisible(true);
                }}
              >
                {passwordVisible ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
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
            {loading ? (
              <div className="flex gap-3 justify-center items-center h-full">
                <img src={Loading} alt="" className="h-[1em]" />
                <span>Logging In ...</span>
              </div>
            ) : (
              "Login"
            )}
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
