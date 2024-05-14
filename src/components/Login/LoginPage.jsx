// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { BsCheckCircleFill } from "react-icons/bs";
// import './Login.css';
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';

// const firebaseConfig = {
//   apiKey: "AIzaSyDlb-kd6pQy8mCf4Y19X98tqCFseg2bT6A",
//   authDomain: "technoshack-cbd13.firebaseapp.com",
//   projectId: "technoshack-cbd13",
//   storageBucket: "technoshack-cbd13.appspot.com",
//   messagingSenderId: "61352720868",
//   appId: "1:61352720868:web:84164ee51dc88043552ff1",
//   measurementId: "G-93RE6G13KP"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errEmail, setErrEmail] = useState("");
//   const [errPassword, setErrPassword] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);

//   const handleEmail = (e) => {
//     setEmail(e.target.value);
//     setErrEmail("");
//   };

//   const handlePassword = (e) => {
//     setPassword(e.target.value);
//     setErrPassword("");
//   };

//   const handleSignIn = async (e) => {
//     e.preventDefault();

//     try {
//       if (!email) {
//         setErrEmail("Enter your email");
//         return;
//       }

//       if (!password) {
//         setErrPassword("Enter your password");
//         return;
//       }

//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       setSuccessMsg(`Hello ${userCredential.user.displayName || 'there'}, You have successfully signed in!`);
//     } catch (error) {
//       console.error(error.code, error.message);
//       if (error.code === 'auth/user-not-found') {
//         setErrEmail("User not found. Please check your email.");
//         setErrPassword("");
//       } else if (error.code === 'auth/wrong-password') {
//         setErrPassword("Invalid password. Please try again.");
//         setErrEmail("");
//       } else {
//         console.error(error.message);
//       }
//     }
//   };

//   const handleForgotPassword = async () => {
//     try {
//       if (!email) {
//         return;
//       }
//       await sendPasswordResetEmail(auth, email);
//       setShowForgotPasswordForm(false);
//       setSuccessMsg("Password reset email sent. Check your inbox.");
//     } catch (error) {
//       console.error(error.code, error.message);
//     }
//   };

//   return (
//     <div className="login-page-container">
//       <div className="left-content">
//         <Link to="/">
//           <img alt="logoImg" className="w-28" />
//         </Link>
//         <div className="flex flex-col gap-1 -mt-1">
//           <h1 className="font-titleFont text-xl font-medium">
//             Stay sign in for more
//           </h1>
//           <p className="text-base">When you sign in, you are with us!</p>
//         </div>
//         <div className="w-[300px] flex items-start gap-3">
//           <span className="text-green-500 mt-1">
//             <BsCheckCircleFill />
//           </span>
//           <p className="text-base text-gray-300">
//             <span className="text-white font-semibold font-titleFont">
//               Get started fast with TechnoShack
//             </span>
//             <br />
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
//             nisi dolor recusandae consectetur!
//           </p>
//         </div>
//       </div>
//       <div className="right-content">
//         {successMsg ? (
//           <div className="form-container">
//             <p className="text-green-500 font-medium font-titleFont">
//               {successMsg}
//             </p>
//             <Link to="/">
//               <button className="submit-button">
//                 Home
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <form className="form-container">
//             <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
//               Sign in
//             </h1>
//             <div className="flex flex-col gap-3">
//               <div className="form-element">
//                 <p className="font-titleFont text-base font-semibold text-gray-600">
//                   Work Email
//                 </p>
//                 <input
//                   onChange={handleEmail}
//                   value={email}
//                   className="input-field"
//                   type="email"
//                   placeholder="john@workemail.com"
//                 />
//                 {errEmail && (
//                   <p className="error-message text-red-500">
//                     <span className="font-bold italic mr-1">!</span>
//                     {errEmail}
//                   </p>
//                 )}
//               </div>
//               <div className="form-element">
//                 <p className="font-titleFont text-base font-semibold text-gray-600">
//                   Password
//                 </p>
//                 <input
//                   onChange={handlePassword}
//                   value={password}
//                   className="input-field"
//                   type="password"
//                   placeholder="Create password"
//                 />
//                 {errPassword && (
//                   <p className="error-message text-red-500">
//                     <span className="font-bold italic mr-1">!</span>
//                     {errPassword}
//                   </p>
//                 )}
//               </div>
//               <button
//                 onClick={handleSignIn}
//                 className="submit-button"
//               >
//                 Sign In
//               </button>
//               <p className="sign-up-link">
//                 Don't have an Account?{" "}
//                 <Link to="/resgister">
//                   <span className="hover:text-blue-600">
//                     Register
//                   </span>
//                 </Link>
//               </p>
//               {showForgotPasswordForm && (
//                 <div className="forgot-password-form">
//                   <input
//                     onChange={handleEmail}
//                     value={email}
//                     className="input-field"
//                     type="email"
//                     placeholder="Enter your email"
//                   />
//                   <button
//                     onClick={handleForgotPassword}
//                     className="submit-button"
//                   >
//                     Send Reset Email
//                   </button>
//                 </div>
//               )}
//               {!showForgotPasswordForm && (
//                 <p className="forgot-password-link">
//                   <button
//                     className="forgot-password-button"
//                     onClick={() => setShowForgotPasswordForm(true)}
//                   >
//                     Forgot your password?
//                   </button>
//                 </p>
//               )}
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
