import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email and password match
    if (formData.email === "test@gmail.com" && formData.password === "test") {
      console.log("Login successful");
      // Navigate to addmanager page
      navigate("/addmanager");
    } else {
      alert("Email or password is incorrect");
    }
  };

  return (
    <>
      <div className="main-div-for-login ">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
