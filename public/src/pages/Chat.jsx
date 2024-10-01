import { useEffect, useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import {
  allUsersRoute,
  host,
  recieveMessageRoute,
  sendMessageRoute,
} from "../utils/APIRoutes";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoCloseCircleSharp } from "react-icons/io5";

function Chat() {
  const navigate = useNavigate();

  const socket = useRef();

  // ==============         UseStates         =====================
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [selectedContact, setSelectedContact] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [input, setInput] = useState("");
  const [chatAdded, setChatAdded] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

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

  const handleSelectContact = async (e) => {
    setSelectedContact(e.username);
    setCurrentChat(e);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: input,
    });
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: input,
    });
    console.log(messages);
    // const msgs = [...messages];
    // input.push({})
    setChatAdded(input);

    setInput("");

    // if (input.trim()) {
    //   setMessages([...messages, { text: input, sender: "You" }]);
    //   setInput("");
    // }
  };

  const handleReceiveMessages = async () => {
    const response = await axios.post(recieveMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  };

  //-------------->   UseEffects :    <-----------------------

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (currentUser) {
      handleGetContacts();
      socket.current = io(host);
      // console.log(currentUser._id);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentChat) {
      handleReceiveMessages();
    }
  }, [currentChat, chatAdded]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        console.log("msg-receive : ",msg);
        setArrivalMessage({
          message: { text: msg.message },
          sender: msg.from,
          users: [msg.from, msg.to],
        });
      });
    }
    // console.log(arrivalMessage);
  });

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

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

          <div className="flex-grow p-4 overflow-auto mb-16">
            <div className="shadow-md rounded-lg p-4 bg-white ">
              {selectedContact === undefined ? (
                <HelloComponent />
              ) : (
                <>
                  <div className="block text-2xl font-semibold  capitalize text-black pb-5 pl-1 flex items-center gap-2 max-h-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>

                    <h1 key={selectedContact}>{selectedContact}</h1>
                  </div>
                  {messages.map((message, index) => (
                    <>
                      <div
                        key={index}
                        className={`mb-2 flex ${
                          message.sender === currentUser._id
                            ? "text-left justify-end items-end"
                            : "text-left justify-start items-start"
                        }`}
                      >
                        {/* <span className="block text-sm font-semibold text-gray-900">
                        {message.sender}
                      </span> */}
                        <span
                          className={`block p-2 max-w-2xl rounded inline-block ${
                            message.sender === currentUser._id
                              ? "bg-blue-100"
                              : "bg-gray-200"
                          }`}
                        >
                          {message.message.text}
                        </span>
                      </div>
                    </>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Message Input Form */}
          <form
            onSubmit={sendMessage}
            className="bg-gray-900 p-4 pl-0 flex justify-evenly fixed w-full md:w-9/12 bottom-[0%]"
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
              disabled={input.trim() === "" || input.trim() === " "}
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
