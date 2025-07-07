import React, { useState } from "react";
import { SlClose } from "react-icons/sl";
import { FaCamera } from "react-icons/fa";
import axios from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";

const UserEditModal = ({ isOpen, isClose }) => {
  if (!isOpen) return null;

  const { setUser } = useAuth();

  const [preview, setPreview] = useState(null);
  const [photo, setPhoto] = useState("");
  const [userData, setuserData] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const handlePhotoChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    console.log(file);
    setPreview(file);
    setPhoto(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("firstName", userData.firstName);
    updatedData.append("lastName", userData.lastName);
    updatedData.append("phone", userData.phone);
    if (photo) updatedData.append("image", photo);

    try {
      const res = await axios.put("/auth/update", updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res.data);
      sessionStorage.setItem("user", JSON.stringify(res.data.data));
      setUser(res.data.data);
     
      isClose();
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <>
      <div className="fixed inset-0 bg-black/50 p-30">
        <div className="h-[80vh] w-full max-w-4xl mx-auto border bg-fuchsia-100 rounded-xl overflow-y-auto scrollbar-hide">
          <div className="flex justify-between py-5 px-10  border-b-2 sticky top-0 bg-fuchsia-200">
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <button onClick={isClose}>
              <SlClose className="text-2xl text-red-500" />
            </button>
          </div>
          <div className="p-7 flex gap-20 items-center">
            <div className="relative w-50 ">
              <div className="border h-50 w-50 rounded-full overflow-hidden ">
                <img
                  src={preview || userData.photo}
                  alt=""
                  className="h-50 w-50 object-cover"
                />
              </div>
              <label className="absolute bottom-2 right-1 border rounded-full p-2 bg-amber-100">
                <FaCamera className="text-2xl" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
            </div>
            <div className="w-2/3 grid gap-3">
              <div className="grid grid-cols-[100px_300px] items-center ">
                <label htmlFor="" className="">
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white"
                  onChange={handleChange}
                />
              </div>
              <div className=" grid grid-cols-[100px_300px] items-center">
                <label htmlFor="">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white"
                  onChange={handleChange}
                />
              </div>
              <div className=" grid grid-cols-[100px_300px] items-center">
                <label htmlFor="">Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081] text-[#1A3C5A] bg-white"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              className="m-3 p-3 bg-[#1A3C5A] float-end text-white font-bold rounded-lg hover:bg-[#FF4081] transition-colors duration-200"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEditModal;
