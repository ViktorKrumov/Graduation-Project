import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { BsCheckCircleFill } from "react-icons/bs";
import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!email) {
      setErrEmail("Enter your email");
    }

    if (!password) {
      setErrPassword("Create a password");
    }

    if (email && password) {
      setSuccessMsg(
        `Hello dear, Thank you for your attempt. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${email}`
      );
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="login-page-container">
      <div className="left-content">
        <Link to="/">
          <img alt="logoImg" className="w-28" />
        </Link>
        <div className="flex flex-col gap-1 -mt-1">
          <h1 className="font-titleFont text-xl font-medium">
            Stay sign in for more
          </h1>
          <p className="text-base">When you sign in, you are with us!</p>
        </div>
        <div className="w-[300px] flex items-start gap-3">
          <span className="text-green-500 mt-1">
            <BsCheckCircleFill />
          </span>
          <p className="text-base text-gray-300">
            <span className="text-white font-semibold font-titleFont">
              Get started fast with TechnoShack
            </span>
            <br />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
            nisi dolor recusandae consectetur!
          </p>
        </div>
        <div className="w-[300px] flex items-start gap-3">
          <span className="text-green-500 mt-1">
            <BsCheckCircleFill />
          </span>
          <p className="text-base text-gray-300">
            <span className="text-white font-semibold font-titleFont">
              Access all TechnoShack services
            </span>
            <br />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
            nisi dolor recusandae consectetur!
          </p>
        </div>
        <div className="w-[300px] flex items-start gap-3">
          <span className="text-green-500 mt-1">
            <BsCheckCircleFill />
          </span>
          <p className="text-base text-gray-300">
            <span className="text-white font-semibold font-titleFont">
              Trusted by online Shoppers
            </span>
            <br />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
            nisi dolor recusandae consectetur!
          </p>
        </div>
        <div className="flex items-center justify-between mt-10">
          <Link to="/">
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              © TechnoShack
            </p>
          </Link>
          <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
            Terms
          </p>
          <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
            Privacy
          </p>
          <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
            Security
          </p>
        </div>
      </div>
      <div className="right-content">
        {successMsg ? (
          <div className="form-container">
            <p className="text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signup">
              <button className="submit-button">
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <form className="form-container">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
              Sign in
            </h1>
            <div className="flex flex-col gap-3">
              <div className="form-element">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Work Email
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="input-field"
                  type="email"
                  placeholder="john@workemail.com"
                />
                {errEmail && (
                  <p className="error-message">
                    <span className="font-bold italic mr-1">!</span>
                    {errEmail}
                  </p>
                )}
              </div>
              <div className="form-element">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Password
                </p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="input-field"
                  type="password"
                  placeholder="Create password"
                />
                {errPassword && (
                  <p className="error-message">
                    <span className="font-bold italic mr-1">!</span>
                    {errPassword}
                  </p>
                )}
              </div>
              <button
                onClick={handleSignUp}
                className="submit-button"
              >
                Sign In
              </button>
              <p className="sign-up-link">
                Don't have an Account?{" "}
                <Link to="/signup">
                  <span className="hover:text-blue-600">
                    Sign up
                  </span>
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
