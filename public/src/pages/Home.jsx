import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      {/* App Header */}
      <header className="bg-blue-600 w-full text-white py-5">
        <h1 className="text-4xl font-bold text-center">Welcome to Chatify</h1>
        <p className="text-center text-xl mt-2">A real-time chat application</p>
      </header>

      {/* App Details */}
      <main className="flex flex-col items-center py-10 px-5">
        <section className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-3">App Details</h2>
          <ul className="text-gray-700 text-lg">
            <li>Built with ReactJS, TailwindCSS, MongoDB, and Socket.io</li>
            <li>Real-time messaging with custom-built REST API</li>
            <li>Currently developing features like file sharing and typing indicators</li>
            <li>GitHub Repository: <a href="https://github.com/vaibhav-samdani/chatify-app" className="text-blue-600 underline">Chatify</a></li>
          </ul>
        </section>

        {/* Developer Details */}
        <section className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-6">
          <h2 className="text-2xl font-semibold mb-3">Developer Details</h2>
          <ul className="text-gray-700 text-lg">
            <li>Name: Vaibhav Samdani</li>
            <li>Location: Jaipur, India</li>
            <li>BTech in CSE (2023 - 2027)</li>
            <li>GitHub: <a href="https://github.com/vaibhav-samdani" className="text-blue-600 underline">vaibhav-samdani</a></li>
            <li>Email: <a href="mailto:vaibhavmaheshwari517@gmail.com" className="text-blue-600 underline">vaibhavmaheshwari517@gmail.com</a></li>
            <li>Portfolio: <a href="https://vaibhav-samdani.github.io/" className="text-blue-600 underline">vaibhav-samdani.github.io</a></li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 bg-gray-700 text-white">
        <p>&copy; {new Date().getFullYear()} Chatify. Built by Vaibhav Samdani.</p>
      </footer>
    </div>
  );
};

export default Home;
