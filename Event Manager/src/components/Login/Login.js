import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';

const Login = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

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
      const response = await axios.post('http://localhost:8888/api/manager/login',loginData);
      console.log(response)
      if (response.status === 200) {
        console.log('Login successful');
        alert('Login successful');

        localStorage.setItem('managerId', response.data.managerId);
        localStorage.setItem('managertoken', response.data.token);
        localStorage.setItem('managerName', response.data.managerName);
        navigate('/quotation');
      } 
      else{
        console.log(response)
        setError(response.data.message)
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Internal server error');
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
          <h2 className="text-3xl font-bold text-center flex-grow">Manager Login</h2>
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
              {
                error ? <p className="text-red-500">{error}</p> :<></>
              }
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
