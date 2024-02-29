import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { BsCheckCircleFill } from "react-icons/bs";
import './RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setErrConfirmPassword("");
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!email) {
      setErrEmail("Enter your email");
    }

    if (!password) {
      setErrPassword("Create a password");
    }

    if (password !== confirmPassword) {
      setErrConfirmPassword("Passwords do not match");
    }

    if (email && password && password === confirmPassword) {
      setSuccessMsg(
        `Congratulations! Your account has been created successfully with the email ${email}. You can now sign in.`
      );
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="register-page-container">
      <div className="left-content">
        <Link to="/">
          <img alt="logoImg" className="w-28" />
        </Link>
        <div className="flex flex-col gap-1 -mt-1">
          <h1 className="font-titleFont text-xl font-medium">
            Create an Account
          </h1>
          <p className="text-base">Join us today!</p>
        </div>
        <div className="w-[300px] flex items-start gap-3">
          <span className="text-green-500 mt-1">
            <BsCheckCircleFill />
          </span>
          <p className="text-base text-gray-300">
            <span className="text-white font-semibold font-titleFont">
              Enjoy all TechnoShack services
            </span>
            <br />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
            nisi dolor recusandae consectetur!
          </p>
        </div>
        {/* Additional points about the benefits of registering */}
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
            <Link to="/login">
              <button className="submit-button">
                Sign In
              </button>
            </Link>
          </div>
        ) : (
          <form className="form-container">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
              Register
            </h1>
            <div className="flex flex-col gap-3">
              <div className="form-element">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Email
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="input-field"
                  type="email"
                  placeholder="john@example.com"
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
              <div className="form-element">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Confirm Password
                </p>
                <input
                  onChange={handleConfirmPassword}
                  value={confirmPassword}
                  className="input-field"
                  type="password"
                  placeholder="Confirm password"
                />
                {errConfirmPassword && (
                  <p className="error-message">
                    <span className="font-bold italic mr-1">!</span>
                    {errConfirmPassword}
                  </p>
                )}
              </div>
              <button
                onClick={handleSignUp}
                className="submit-button"
              >
                Register
              </button>
              <p className="sign-up-link">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="hover:text-blue-600">
                    Sign in
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

export default RegisterPage;
