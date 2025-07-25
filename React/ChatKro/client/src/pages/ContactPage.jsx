import React, { useState } from "react";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import FAQSection from "../components/FAQSection";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general"
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general"
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-base-100 ">
      {/* Hero Section */}
      <div className="hero min-h-96 bg-gradient-to-br from-info to-success flex justify-center items-center">
        <div className="hero-content text-center text-white">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold font-sans">Contact Us</h1>
            <p className="mb-5 text-lg font-sans">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8 font-sans">Get in Touch</h2>

            <div className="space-y-6">
              {/* Address */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl text-primary">📍</div>
                    <div>
                      <h3 className="font-bold text-lg font-sans">Office Address</h3>
                      <p className="text-base-content/70 font-sans">
                        123 Chat Street<br />
                        Tech Valley, CA 94043<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl text-primary">📞</div>
                    <div>
                      <h3 className="font-bold text-lg font-sans">Phone</h3>
                      <p className="text-base-content/70 font-sans">
                        +1 (555) 123-4567<br />
                        Monday - Friday, 9 AM - 6 PM PST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl text-primary">✉️</div>
                    <div>
                      <h3 className="font-bold text-lg font-sans">Email</h3>
                      <p className="text-base-content/70 font-sans">
                        support@chatkro.com<br />
                        info@chatkro.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="card bg-base-200">
                <div className="card-body">
                    <div className="flex items-center gap-4">
                        <h3 className="font-bold text-lg font-sans">Follow Us</h3>
                        <div className="flex gap-2">
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-primary">
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-secondary">
                                <FaFacebookF className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-accent">
                                <FaLinkedinIn className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8 font-sans">Send us a Message</h2>
            
            {isSubmitted ? (
              <div className="card bg-success text-success-content">
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="card-title justify-center font-sans">Message Sent!</h3>
                  <p className="font-sans">Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              </div>
            ) : (
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-sans">Name</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="input input-bordered font-sans"
                          placeholder="Your Name"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-sans">Email</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="input input-bordered font-sans"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-sans">Category</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="select select-bordered font-sans"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing</option>
                        <option value="feature">Feature Request</option>
                        <option value="bug">Bug Report</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>

                    {/* Subject */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-sans">Subject</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="input input-bordered font-sans"
                        placeholder="Brief description of your inquiry"
                        required
                      />
                    </div>

                    {/* Message */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-sans">Message</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="textarea textarea-bordered h-32 font-sans"
                        placeholder="Please provide details about your inquiry..."
                        required
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                      <button type="submit" className="btn btn-primary btn-block font-sans">
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
       <FAQSection/>
      </div>
    </div>
  );
};

export default ContactPage;
