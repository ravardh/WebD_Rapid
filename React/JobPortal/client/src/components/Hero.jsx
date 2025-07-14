import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='bg-[#EAEDFF] lg:bg-[url("hero.png")] w-full h-[90vh] bg-center bg-no-repeat flex-col relative'>
        <div className="md:absolute md:w-1/2 h-full flex flex-col justify-center items-center md:items-start gap-10 left-2/12 top-0">
          <span className="text-5xl  md:text-6xl lg:text-8xl text-blue-950 font-extrabold leading-12 md:leading-18 lg:leading-25">
            Find the <br /> most exciting <br />
            startup jobs
          </span>

          {/* <div className="grid md:flex justify-items-center md:justify-between bg-white rounded-2xl gap-8 p-5 md:p-0 md:w-[85%] w-[100]">
            <div className="grid md:flex items-center gap-3">
              <label htmlFor="keyword"></label>
              <input
                type="text"
                name="Job Tittle or Keyword"
                id="keyword"
                placeholder="Job Tittle or Keyword"
                className="text-gray-700 py-5 px-3 focus:outline-none focus:ring-0"
              />
              <span className="text-3xl text-gray-400 hidden md:inline">|</span>
              <select
                name="Location"
                className="px-10 focus:outline-none focus:ring-0 "
              >
                <option value="1">Location BD</option>
                <option value="2">Location PK</option>
                <option value="3">Location US</option>
                <option value="4">Location UK</option>
              </select>
            </div>

            
          </div> */}
          <button
              className="bg-[#F54677] text-white w-35 p-5 rounded-2xl md:hidden"
              onClick={()=>navigate("/jobs")}
            >
              Explore Jobs
            </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
