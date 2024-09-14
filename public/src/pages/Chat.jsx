import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  // Pre-populate with some chat messages
  const [messages, setMessages] = useState([
    { text: "Hey, how are you?", sender: "User 1" },
    { text: "I am good, what about you?", sender: "You" },
    { text: "I am doing well too!", sender: "User 1" },
    { text: "What are you working on these days?", sender: "You" },
    { text: "Just building some cool web apps.", sender: "User 1" },
    { text: "That sounds awesome!", sender: "You" },
  ]);

  const checkLogin = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      console.log(currentUser);
    }
  };

  useEffect(() => { checkLogin()} , []);
  useEffect( async ()=>{
    if(currentUser){
      const data = await axios.get(`${allUsersRoute}`)
    }
  })

  const [input, setInput] = useState("");
  const [showUserList, setShowUserList] = useState(false); // Toggle state for user list

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "You" }]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Chat App</h1>
      </nav>

      {/* App Content */}
      <div className="flex-grow flex h-full">
        {/* Sidebar */}
        <div
          className={`${
            showUserList ? "block" : "hidden"
          } md:flex md:flex-col md:w-1/4 bg-gray-900 text-white p-4 h-full`}
        >
          <h2 className="text-xl font-bold mb-4">Users</h2>
          <div className="flex-grow overflow-auto">
            <ul>
              <li className="p-2 bg-gray-800 rounded mb-2 cursor-pointer">
                User 1
              </li>
              <li className="p-2 bg-gray-800 rounded mb-2 cursor-pointer">
                User 2
              </li>
              <li className="p-2 bg-gray-800 rounded mb-2 cursor-pointer">
                User 3
              </li>
            </ul>
          </div>
          <button className="bg-red-600 p-2 rounded mt-4">Logout</button>
        </div>

        {/* Chat area */}
        <div className="flex-grow flex flex-col bg-white">
          <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
            <button
              onClick={() => setShowUserList(!showUserList)}
              className="bg-blue-600 text-white px-4 py-2 rounded md:hidden"
            >
              {showUserList ? "Hide Users" : "Show Users"}
            </button>
          </div>

          <div className="flex-grow p-4 overflow-auto">
            <div className="shadow-md rounded-lg p-4 bg-white">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    message.sender === "You" ? "text-right" : "text-left"
                  }`}
                >
                  <span className="block text-sm font-semibold text-gray-900">
                    {message.sender}
                  </span>
                  <span
                    className={`block p-2 rounded inline-block ${
                      message.sender === "You" ? "bg-blue-100" : "bg-gray-200"
                    }`}
                  >
                    {message.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input Form */}
          <form onSubmit={sendMessage} className="bg-gray-900 p-4 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 rounded border border-gray-700 focus:outline-none text-gray-900"
            />
            <button
              type="submit"
              className="ml-2 bg-blue-600 text-white p-2 rounded"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
