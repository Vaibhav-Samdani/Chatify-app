import React, { useState } from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from 'axios'
import { registerRoute } from "../utils/APIRoutes";


const SetAvatar = () => {
  return (
    <div>
      <h1>Set Avatar</h1>
    </div>
  )
}

export default SetAvatar
