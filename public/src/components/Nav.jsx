import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Nav() {

    const navigate = useNavigate()

  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "Chat", href: "/chat", current: false },
  ];
  // State to track the active navbar item
  const [active, setActive] = useState("Home");

  // Function to set the active navbar item
  const handleSetActive = (item) => {
    setActive(item.name);
    navigate(item.href)
    console.log(item);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        {navigation.map((item) => (
          <li
            key={item.name}

            onClick={() => handleSetActive(item)}
            className={`cursor-pointer text-white px-3 py-2 rounded-md text-sm font-medium
              ${active === item.name ? "bg-blue-600" : "hover:bg-gray-700"}`}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
