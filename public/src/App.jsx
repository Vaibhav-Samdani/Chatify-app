import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";
import Navbar from "./components/Navbar";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    {/* <Nav/> */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/setAvatar" element={<SetAvatar/>}/>
        <Route path="/contactus" element={<ContactPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
