import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8888/api/admin/login', loginData);
      const { token, adminId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('adminId', adminId);
      alert("Login Successful");
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <button
            type="button"
            className="text-gray-600"
            onClick={() => navigate(-1)}
          >
            <IoArrowBack className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-bold text-center flex-grow">Admin Login</h2>
        </div>
        <form onSubmit={loginHandler}>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee5fd1]"
              placeholder="Your email"
              autoComplete="email"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee5fd1]"
                placeholder="Your password"
                autoComplete="password"
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEye className="w-5 h-5" />
                ) : (
                  <FaEyeSlash className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#FFCCF5] hover:bg-[#fdbdf0] font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee5fd1]"
          >
            Login
          </button>
        </form>
        <div className="mt-2 ">
          <Link to="/resetpass" className="text-sm text-[#da3aba] font-bold hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
