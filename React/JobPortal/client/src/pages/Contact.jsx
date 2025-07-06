import axios from "../config/api";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const res = await axios.post("public/submitContactForm", form);
      toast.success(res.data.message);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.message);
    }
    // Here you can add API call to send the message
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow mt-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-6">
        Have a question, feedback, or need support? Fill out the form below or
        reach us directly.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="How can we help you?"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
          >
            Send Message
          </button>
          {submitted && (
            <div className="text-green-600 text-sm mt-2">
              Thank you! Your message has been sent.
            </div>
          )}
        </form>
        <div className="flex flex-col gap-6 justify-center">
          <div className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="text-xl text-blue-500" />
            <span>support@jobportal.com</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaPhoneAlt className="text-xl text-green-500" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-xl text-pink-500" />
            <span>123, Tech Park, Bangalore, India</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
