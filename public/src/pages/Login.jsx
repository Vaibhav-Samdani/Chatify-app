import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
  const navigate = useNavigate();


useEffect(()=>{
  if(localStorage.getItem("chat-app-user")){
    navigate("/");
  }
},[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password, confirmPassword } = values;

      const { data } = await axios.post(loginRoute, {
        username: username,
        password: password,
      });
      console.log(data);
      if (!data.status) {
        toast.error(data.msg);
      }
      if (data.status) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;

    if (password === "") {
      toast.error("Username and Password is required");
      return false;
    } else if (username === "") {
      toast.error("Username and Password is required");
      return false;
    }

    return true;
  };

  return (
    <>
      <FormContainer>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img alt="Chatify" src={logo} className="mx-auto h-10 w-auto" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              method="POST"
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                    autoComplete="username"
                    className="block w-full rounded-md border-0 text-gray-900 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 duration-300 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  > 
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={values.password}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-3 placeholder:text-gray-400 focus:ring-2 focus:ring-inset duration-300 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a user?{" "}
              <Link
                to="/register"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </FormContainer>
      {/* <ToastContainer /> */}
      <Toaster position="top-right" reverseOrder={true} />
    </>
  );
};

const FormContainer = styled.div``;

export default Login;
