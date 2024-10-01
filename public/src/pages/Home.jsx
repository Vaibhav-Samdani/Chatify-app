import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Social media icons
import 'animate.css'; // For animations, or you can use TailwindCSS animations
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-black to-blue-900 flex flex-col justify-between items-center">
      {/* App Header */}
      <header className="text-white py-10 w-full text-center animate__animated animate__fadeInDown">
        <h1 className="text-5xl font-extrabold tracking-widest">
          Welcome to <span className="text-blue-400">Chatify</span>
        </h1>
        <p className="text-xl mt-3 text-gray-300">Real-time Messaging App</p>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center w-full px-5 py-10 animate__animated animate__fadeInUp">
        {/* App Details */}
        <section className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-3xl mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-blue-400">App Features</h2>
          <ul className="space-y-3 text-lg">
            <li className="flex items-center">
              <span className="mr-3 text-blue-500">⚙️</span> Built with ReactJS, TailwindCSS, MongoDB, and Socket.io.
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-blue-500">🚀</span> Real-time messaging with custom REST API.
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-blue-500">🔧</span> Developing features like file sharing and typing indicators.
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-blue-500">💻</span> GitHub Repository: 
              <a href="https://github.com/vaibhav-samdani/chatify-app" className="ml-2 underline text-blue-300">Chatify</a>
            </li>
          </ul>
        </section>

        {/* Developer Details */}
        <section className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-3xl mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-blue-400">Developer Info</h2>
          <ul className="space-y-3 text-lg">
            <li className="flex items-center">
              <span className="mr-3 text-blue-500">👨‍💻</span> Name: Vaibhav Samdani
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-blue-500">📍</span> Location: Jaipur, India
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-blue-500">🎓</span> BTech in CSE (2023 - 2027)
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-blue-500">🌐</span> Portfolio: 
              <a href="https://vaibhav-samdani.github.io/" className="ml-2 underline text-blue-300">vaibhav-samdani.github.io</a>
            </li>
          </ul>

          {/* Social Media Icons */}
          <div className="flex space-x-6 mt-6 text-blue-500 justify-center">
            <a href="https://github.com/vaibhav-samdani" className="hover:text-blue-300 text-3xl">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/vaibhav-samdani" className="hover:text-blue-300 text-3xl">
              <FaLinkedin />
            </a>
            <a href="https://x.com/samdanivaibhav_" className="hover:text-blue-300 text-3xl">
              <FaTwitter />
            </a>
          </div>
        </section>

        {/* Contact Me Button */}
        <button onClick={()=>{navigate("/contactus")}} className="bg-blue-600 text-white py-3 px-6 rounded-full text-xl hover:bg-blue-700 shadow-lg animate__animated animate__pulse animate__infinite">
          Contact Me
        </button>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-800 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Chatify. Built by Vaibhav Samdani.</p>
      </footer>
    </div>
  );
};

export default Home;
