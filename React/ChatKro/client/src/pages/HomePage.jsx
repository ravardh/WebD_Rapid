import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-gradient-to-br from-primary to-secondary flex justify-center items-center">
        <div className="hero-content text-center text-primary-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold font-sans">Welcome to ChatKro</h1>
            <p className="mb-5 text-lg font-sans">
              Connect, chat, and communicate with people around the world. 
              Experience seamless messaging with beautiful themes and modern design.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/register" className="btn btn-accent btn-lg font-sans">Get Started</Link>
              <Link to="/about" className="btn btn-outline btn-lg font-sans">Learn More</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 font-sans">Why Choose ChatKro?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="card-title justify-center font-sans">Real-time Messaging</h3>
                <p className="font-sans">Instant messaging with real-time updates and notifications.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="card-title justify-center font-sans">Beautiful Themes</h3>
                <p className="font-sans">Multiple stunning themes to personalize your chat experience.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="card-title justify-center font-sans">Secure & Private</h3>
                <p className="font-sans">End-to-end encryption ensures your conversations stay private.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
     <div className="py-16 bg-base-100">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      <div className="stat bg-base-200 shadow rounded-lg p-6 text-center">
        <div className="stat-title font-sans">Active Users</div>
        <div className="stat-value text-primary font-sans">10K+</div>
        <div className="stat-desc font-sans">Growing every day</div>
      </div>

      <div className="stat bg-base-200 shadow rounded-lg p-6 text-center">
        <div className="stat-title font-sans">Messages Sent</div>
        <div className="stat-value text-secondary font-sans">1M+</div>
        <div className="stat-desc font-sans">And counting</div>
      </div>

      <div className="stat bg-base-200 shadow rounded-lg p-6 text-center">
        <div className="stat-title font-sans">Themes Available</div>
        <div className="stat-value text-accent font-sans">12</div>
        <div className="stat-desc font-sans">Customize your style</div>
      </div>
    </div>
  </div>
</div>


      {/* CTA Section */}
      <div className="py-16 bg-primary text-primary-content">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 font-sans">Ready to Start Chatting?</h2>
          <p className="text-xl mb-8 font-sans">Join thousands of users already enjoying ChatKro</p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="btn btn-accent btn-lg font-sans">Sign Up Now</Link>
            <Link to="/chat" className="btn btn-outline btn-lg font-sans">Try Demo</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
