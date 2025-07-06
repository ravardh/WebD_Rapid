import React from 'react';
import { FaSearch, FaUserTie, FaRocket, FaHandshake } from 'react-icons/fa';
import heroImg from '../assets/image.png'; // Adjust path if needed

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-0 md:p-8 bg-white rounded-xl shadow mt-10">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-xl p-8">
        <img src={heroImg} alt="Job Portal Hero" className="w-40 h-40 object-contain mb-4 md:mb-0" />
        <div>
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2">Welcome to Job Portal</h1>
          <p className="text-lg text-blue-900 mb-2">Your Gateway to a Brighter Career</p>
          <p className="text-gray-700">Connecting talent with opportunity. Find your dream job or the perfect candidate, all in one place.</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 mb-8 px-8">
        <div className="flex items-start gap-4">
          <FaSearch className="text-3xl text-blue-500 mt-1" />
          <div>
            <h3 className="font-bold text-blue-700">Smart Job Search</h3>
            <p className="text-gray-700">Advanced filters and recommendations to help you find the right job, fast.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FaUserTie className="text-3xl text-green-500 mt-1" />
          <div>
            <h3 className="font-bold text-green-700">For Employers & Candidates</h3>
            <p className="text-gray-700">Easy-to-use tools for both job seekers and recruiters, with secure communication.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FaRocket className="text-3xl text-pink-500 mt-1" />
          <div>
            <h3 className="font-bold text-pink-700">Fast Application Process</h3>
            <p className="text-gray-700">Apply to jobs in seconds with a streamlined, modern interface.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FaHandshake className="text-3xl text-yellow-500 mt-1" />
          <div>
            <h3 className="font-bold text-yellow-700">Trusted Connections</h3>
            <p className="text-gray-700">Transparent, reliable, and secure platform for building your career or team.</p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="px-8 pb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          We empower individuals to achieve their career goals and help organizations discover the best talent. Whether you are a fresher, a professional, or a recruiter, our portal is designed to make your journey smooth and successful.
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Curated job listings across industries</li>
          <li>Personalized job recommendations</li>
          <li>Secure and transparent communication</li>
          <li>Dedicated support for all users</li>
        </ul>
      </div>
      <div className="mt-8 text-center text-gray-500 text-sm pb-4">
        &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
      </div>
    </div>
  );
};

export default About;