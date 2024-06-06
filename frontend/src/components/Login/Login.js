import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { email, password } = formData;

    // Validation checks
    if (!email && !password) {
      window.alert("Please enter your email and password.");
    } else if (!email) {
      window.alert("Please enter your email.");
    } else if (!password) {
      window.alert("Please enter your password.");
    } else if (email !== "test@gmail.com" && password !== "test") {
      window.alert("Email is incorrect.\nPassword is incorrect.");
    } else if (email !== "test@gmail.com") {
      window.alert("Email is incorrect.");
    } else if (password !== "test") {
      window.alert("Password is incorrect.");
    } else {
      console.log("Login successful");
      navigate("/dashboard");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/'); // Navigate to home or any other page on close
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay login-popup" onClick={closeModal}>
      <div className="modal-content-login bounce-in" onClick={(e) => e.stopPropagation()}>
        <div className="container-login">
          <div className="screen">
            <div className="screen__content">
              <form className="login" onSubmit={handleSubmit}>
                <h3 className="fw-bold">Admin Login</h3>
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input
                    type="text"
                    className="login__input"
                    placeholder="Enter Email ID"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <FaLock className="login__icon" />
                  <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  <input
                    type="password"
                    className="login__input"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="button login__submit">
                  <span className="button__text-login">Log In Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
              <Link to="/" onClick={closeModal}>
                <h1 className="arrow">
                  <span className="fs-5 fw-bold">←</span>Back
                </h1>
              </Link>
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
