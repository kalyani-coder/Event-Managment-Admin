import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/manager/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful');
        alert('Login successful');

        localStorage.setItem('managerId', data._id);
        localStorage.setItem('token', data.token);
        navigate('/quotation');
      } else {
        if (response.status === 404) {
          setError('Email not found');
        } else if (response.status === 401) {
          setError('Incorrect password');
        } else {
          setError(data.message);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Internal server error');
    }
  };

  const navigatePage = () => {
    window.location.href = "https://ssdpune.org"
  }

  return (
    <div className="modal-overlay login-popup">
      <div className="modal-content-login">
        <div className="container-login">
          <div className="screen">
            <div className="screen__content">
              <form className="login" onSubmit={handleLogin}>
                <h3 className="fw-bold">Manager Login</h3>
                {error && <p className="error-message">{error}</p>}
                <div className="login__field">
                  <FaEnvelope className="login__icon" />
                  <input
                    type="text"
                    className="login__input"
                    placeholder="Enter Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="login__field">
                  <FaLock className="login__icon" />
                  <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="login__input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="button login__submit">
                  <span className="button__text-login">Log In Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
              <h1 className="arrow" onClick={navigatePage}>
                <span className="fs-5 fw-bold">←</span>Back
              </h1>
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
