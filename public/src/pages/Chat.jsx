import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsersRoute } from "../utils/APIRoutes";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoCloseCircleSharp } from "react-icons/io5";

function Chat() {
  const navigate = useNavigate();

  // ==============         UseStates         =====================
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [selectedContact, setSelectedContact] = useState(undefined);
  const [input, setInput] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hey, how are you?", sender: "User 1" },
    { text: "I am good, what about you?", sender: "You" },
    { text: "I am doing well too!", sender: "User 1" },
    { text: "What are you working on these days?", sender: "You" },
    { text: "Just building some cool web apps.", sender: "User 1" },
    { text: "That sounds awesome!", sender: "You" },
  ]);

  // ================        Handle Functions         =======================

  const checkLogin = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      // console.log(currentUser);
    }
  };
  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleGetContacts = async () => {
    if (currentUser) {
      axios.get(`${allUsersRoute}/${currentUser._id}`).then((data) => {
        setContacts(data.data);
      });
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("chat-app-user");
    navigate("/login");
  };

  const handleSelectContact = (e) => {
    setSelectedContact(e.username);
  };
  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "You" }]);
      setInput("");
    }
  };

  //-------------->   UseEffects :    <-----------------------

  useEffect(() => {
    checkLogin();
  }, []);
  useEffect(() => {
    handleGetContacts();
  }, [currentUser]);

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
              {contacts.map((contact) => {
                return (
                  <li
                    key={contact._id}
                    onClick={() => {
                      handleSelectContact(contact);
                    }}
                    className={`p-2 bg-gray-800 rounded mb-2 cursor-pointer ${
                      selectedContact === contact.username
                        ? `bg-gray-800 border duration-150`
                        : `bg-gray-700`
                    }`}
                  >
                    {contact.username}
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            onClick={() => {
              handleLogOut();
            }}
            className="bg-red-600 p-2 rounded mt-4"
          >
            Logout
          </button>
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
              <div className="block text-2xl font-bold text-gray-900 capitalize pb-5">
                <h1>{selectedContact}</h1>
              </div>
              {selectedContact === undefined ? (
                <HelloComponent />
              ) : (
                messages.map((message, index) => (
                  <>
                    <div
                      key={index}
                      className={`mb-2 ${
                        message.sender === "You" ? "text-right" : "text-left"
                      }`}
                    >
                      {/* <span className="block text-sm font-semibold text-gray-900">
                        {message.sender}
                      </span> */}
                      <span
                        className={`block p-2 rounded inline-block ${
                          message.sender === "You"
                            ? "bg-blue-100"
                            : "bg-gray-200"
                        }`}
                      >
                        {message.text}
                      </span>
                    </div>
                  </>
                ))
              )}
            </div>
          </div>

          {/* Message Input Form */}
          <form
            onSubmit={sendMessage}
            className="bg-gray-900 p-4 pl-0 flex justify-evenly"
          >
            {/* <EmojiPicker /> */}
            <div className="text-yellow-400 flex justify-center items-center mr-2">
              {showEmojiPicker ? (
                <>
                  {/* <EmojiPicker className="sticky bottom-[300%]" /> */}
                  <IoCloseCircleSharp
                    className="h-6 w-6"
                    onClick={() => {
                      handleEmojiPicker();
                    }}
                  />
                </>
              ) : (
                <BsEmojiSmileFill
                  className="h-6 w-6"
                  onClick={() => {
                    handleEmojiPicker();
                  }}
                />
              )}
            </div>
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

const HelloComponent = () => {
  const [username, setUsername] = useState("");

  const handleUsername = async () => {
    setUsername(
      await JSON.parse(localStorage.getItem("chat-app-user")).username
    );
  };

  useEffect(() => {
    handleUsername();
  }, []);
  return (
    <div className="flex items-center justify-center h-96 bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Hello, {username}!
        </h1>
        <p className="mt-4 text-gray-600 text-sm md:text-base">
          Welcome to the chat!
        </p>
      </div>
    </div>
  );
};

export default Chat;
