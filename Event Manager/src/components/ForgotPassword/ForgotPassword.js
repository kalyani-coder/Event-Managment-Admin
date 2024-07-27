import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoArrowBack } from 'react-icons/io5';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [timer, setTimer] = useState(120);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "otp") {
      setOtp(value);
    } else if (name === "password") {
        setPassword(value);
      }
  };

  const sendOTPHandler = async () => {
    if(!email){
      alert("Emial Is Required")
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8888/api/manager/update-pass`,
        { email }
      );
      setLoading(false);
      if (response.status === 200) {
        setOtpSent(true);
        alert("OTP sent successfully");
      } else {
        setErrorMessage(response.data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpLoading(true);
    try {
      const res =  await axios.post(
        `http://localhost:8888/api/manager/update-pass/verify`,
        { email ,otp , password}
      );
      if(res.status === 200){
        alert("OTP Verified successfully & Password Changed Successfully");
        navigate(`/`);
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("OTP verification failed. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-7 space-y-4">
      <div className="flex items-center mb-6">
          <button
            type="button"
            className="text-gray-600"
            onClick={() => navigate(-1)}
          >
            <IoArrowBack className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-bold text-center flex-grow">Verify your Email account</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-base font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChangeHandler}
              required
              className={`bg-gray-50 border ${
                errorMessage ? "border-red-500" : "border-gray-300"
              } text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-[#ee5fd1] focus:border-[#ee5fd1] block w-full p-2.5`}
              placeholder="name@company.com"
            />
            {errorMessage && (
              <p className="text-red-500 text-base mt-1">{errorMessage}</p>
            )}
          </div>

          <button
            type="button"
            onClick={sendOTPHandler}
            className="w-full bg-[#FFCCF5] hover:bg-[#fdbdf0] font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee5fd1]"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>

        {otpSent && (
          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter OTP
              </label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={onChangeHandler}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-[#ee5fd1] focus:border-[#ee5fd1] block w-full p-2.5"
                placeholder="Enter OTP"
              />
            </div>
            <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
                <input
                  type="text"
                  name="password"
                  value={password}
                  onChange={onChangeHandler}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Password"
                />
              </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              disabled={otpLoading}
            >
              {otpLoading ? "Verifying OTP..." : "Verify OTP"}
            </button>
            <p className="text-gray-500 text-sm mt-2">
              Time remaining: {formatTimer(timer)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
