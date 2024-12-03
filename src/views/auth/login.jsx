import React, { useState } from "react";
import TpkLogo from "../../assets/tpk-logo.png";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import style from "./style.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; 

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false); 
  const handleLogin = () => {
    setIsLoading(true);
    const validUsername = "autogate";
    const validPassword = "#m4ritime6atew4y";

    if (username === validUsername && password === validPassword) {
      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid username or password",
      });
    }

    setIsLoading(false);
  };
  return (
    <>
      <Helmet>
        <title>TPK AUTOGATE Monitoring | Login</title>
      </Helmet>
      <div
        className={`relative ${style.bgjictbg} bg-cover bg-no-repeat w-full h-screen`}
      >
        <div className="absolute w-full h-screen"></div>
        <div className="z-10 absolute flex flex-col items-center justify-center m-auto left-0 right-0 top-0 bottom-0 md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 md: sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <img className="w-86" src={TpkLogo} alt="logo" />
              
              {/* Input for Username */}
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update username state
                className="w-full p-2 border border-gray-300 rounded"
              />
              
              {/* Input for Password with Eye Toggle */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </span>
              </div>
              
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full text-white bg-[#004AAD] transition-all hover:bg-[#26ACFA] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></div>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
              <div className="mt-2">
                <p className="text-center text-xs">
                  &copy; 2024 Autogate Monitoring System
                </p>
                <p className="text-center text-xs">
                  All Rights Reserved | TERMINAL PETIKEMAS IPC TPK
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
``