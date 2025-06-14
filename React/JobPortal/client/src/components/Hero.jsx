import React from "react";

const Hero = () => {
  return (
    <>
      <div className='bg-[url("hero.png")] w-full h-[90vh] bg-center bg-no-repeat flex-col relative'>
        <div className="absolute w-1/2 h-full flex flex-col justify-center items-start gap-10 left-2/12 top-0">
          <span className="text-8xl text-blue-950 font-extrabold leading-25">
            Find the <br /> most excitng <br />
            startup jobs
          </span>

          <div className="w-[85%] flex justify-between bg-white rounded-2xl">
            <div className="flex items-center gap-3 w-full">
              <label htmlFor="keyword"></label>
              <input
                type="text"
                name="Job Tittle or Keyword"
                id="keyword"
                placeholder="Job Tittle or Keyword"
                className="text-gray-700 py-5 px-3 focus:outline-none focus:ring-0"
              />
              <span className="text-3xl text-gray-400">|</span>
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

            <button className="bg-[#F54677] text-white w-35 p-5 rounded-2xl">Find Job</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;