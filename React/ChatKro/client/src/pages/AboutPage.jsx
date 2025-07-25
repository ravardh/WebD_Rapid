import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Hero Section */}
      <div className="hero min-h-96 bg-gradient-to-r from-secondary to-accent flex justify-center items-center">
        <div className="hero-content text-center text-white">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold font-sans">About ChatKro</h1>
            <p className="mb-5 text-lg font-sans">
              Building the future of communication, one message at a time.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 font-sans">Our Mission</h2>
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <p className="text-lg leading-relaxed text-center font-sans">
                At ChatKro, we believe communication should be seamless, beautiful, and accessible to everyone. 
                Our mission is to create a platform that brings people together through innovative messaging 
                technology while respecting privacy and promoting meaningful connections.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 font-sans">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-primary text-primary-content">
              <div className="card-body text-center">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="card-title justify-center font-sans">Privacy First</h3>
                <p className="font-sans">Your data and conversations are protected with industry-leading security.</p>
              </div>
            </div>

            <div className="card bg-secondary text-secondary-content">
              <div className="card-body text-center">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="card-title justify-center font-sans">Fast & Reliable</h3>
                <p className="font-sans">Lightning-fast message delivery with 99.9% uptime guarantee.</p>
              </div>
            </div>

            <div className="card bg-accent text-accent-content">
              <div className="card-body text-center">
                <div className="text-3xl mb-4">🎨</div>
                <h3 className="card-title justify-center font-sans">Beautiful Design</h3>
                <p className="font-sans">Stunning interfaces that make chatting a delightful experience.</p>
              </div>
            </div>

            <div className="card bg-neutral text-neutral-content">
              <div className="card-body text-center">
                <div className="text-3xl mb-4">🌍</div>
                <h3 className="card-title justify-center font-sans">Global Reach</h3>
                <p className="font-sans">Connect with people from all around the world, anytime, anywhere.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 font-sans">Our Story</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-start timeline-box font-sans">
                <div className="font-bold">2024 - The Beginning</div>
                <p>ChatKro was born from a simple idea: messaging should be both powerful and beautiful.</p>
              </div>
              <div className="timeline-middle">
                <div className="timeline-marker bg-primary"></div>
              </div>
              <div className="timeline-end"></div>
            </div>

            <div className="timeline-item">
              <div className="timeline-start"></div>
              <div className="timeline-middle">
                <div className="timeline-marker bg-secondary"></div>
              </div>
              <div className="timeline-end timeline-box font-sans">
                <div className="font-bold">2024 - First Release</div>
                <p>Launched our MVP with basic messaging and theme support.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-start timeline-box font-sans">
                <div className="font-bold">2025 - Growing Community</div>
                <p>Reached 10,000+ active users and added advanced features.</p>
              </div>
              <div className="timeline-middle">
                <div className="timeline-marker bg-accent"></div>
              </div>
              <div className="timeline-end"></div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8 font-sans">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-200">
              <div className="avatar mx-auto pt-8">
                <div className="w-24 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  <span className="text-2xl font-bold">JD</span>
                </div>
              </div>
              <div className="card-body text-center">
                <h3 className="card-title justify-center font-sans">John Doe</h3>
                <p className="font-sans">CEO & Founder</p>
                <p className="text-sm font-sans">Passionate about connecting people through technology.</p>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="avatar mx-auto pt-8">
                <div className="w-24 rounded-full bg-secondary text-secondary-content flex items-center justify-center">
                  <span className="text-2xl font-bold">JS</span>
                </div>
              </div>
              <div className="card-body text-center">
                <h3 className="card-title justify-center font-sans">Jane Smith</h3>
                <p className="font-sans">CTO</p>
                <p className="text-sm font-sans">Leading our technical innovation and security initiatives.</p>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="avatar mx-auto pt-8">
                <div className="w-24 rounded-full bg-accent text-accent-content flex items-center justify-center">
                  <span className="text-2xl font-bold">MB</span>
                </div>
              </div>
              <div className="card-body text-center">
                <h3 className="card-title justify-center font-sans">Mike Brown</h3>
                <p className="font-sans">Lead Designer</p>
                <p className="text-sm font-sans">Creating beautiful and intuitive user experiences.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
