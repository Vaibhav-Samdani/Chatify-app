import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; // Social media icons
import "animate.css"; // For animations
import axios from "axios";
import { contactUsRoute } from "../utils/APIRoutes";

const ContactPage = () => {
  const [values, setValues] = useState({
    name: "Vaibhav Samdani",
    email: "Vaibhavsamdani24@gmail.com",
    message: "Testing Mails",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(contactUsRoute,values) 
    console.log(response.data);
    setValues({
        name: "",
        email: "",
        message: "",
      })

  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-black to-blue-900 flex flex-col justify-center items-center">
      {/* Page Header */}
      <header className="text-white py-10 w-full text-center animate__animated animate__fadeInDown">
        <h1 className="text-5xl font-extrabold tracking-widest">
          Get in Touch
        </h1>
        <p className="text-xl mt-3 text-gray-300">
          Feel free to contact me for any project or inquiry!
        </p>
      </header>

      {/* Contact Form Section */}
      <section className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-3xl animate__animated animate__fadeInUp">
        <h2 className="text-3xl font-semibold mb-6 text-blue-400">
          Contact Me
        </h2>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-lg text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name" 
              required
              onChange={(e) => handleChange(e)}
              value={values.name}
              className="w-full mt-2 p-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-lg text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              name="email"
              onChange={(e) => handleChange(e)}
              value={values.email}
              className="w-full mt-2 p-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-lg text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              onChange={(e) => handleChange(e)}
              value={values.message}
              className="w-full mt-2 p-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Write your message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button className="w-full py-3 bg-blue-600 text-white rounded-full text-xl hover:bg-blue-700 shadow-lg animate__animated animate__pulse animate__infinite">
            Send Message
          </button>
        </form>
      </section>

      {/* Social Media Links */}
      <section className="flex space-x-6 mt-12 text-blue-500 justify-center animate__animated animate__fadeInUp">
        <a
          href="https://github.com/vaibhav-samdani"
          className="hover:text-blue-300 text-3xl"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/vaibhav-samdani"
          className="hover:text-blue-300 text-3xl"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://x.com/samdanivaibhav_"
          className="hover:text-blue-300 text-3xl"
        >
          <FaTwitter />
        </a>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-800 text-center text-gray-400 mt-10">
        <p>
          &copy; {new Date().getFullYear()} Chatify. Built by Vaibhav Samdani.
        </p>
      </footer>
    </div>
  );
};

export default ContactPage;
