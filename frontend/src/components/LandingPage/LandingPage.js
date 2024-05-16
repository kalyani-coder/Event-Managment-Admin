import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const handleLogin = () => {
    if (selectedOption === '') {
      alert('Please select an option');
    } else {
      // Navigate based on the selected option
      if (selectedOption === 'Manager') {
        navigate('/manager/login'); // Navigate to manager login page
      } else if (selectedOption === 'Admin') {
        navigate('/login'); // Navigate to admin login page
      }
    }
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    // Automatically navigate when "Admin" is selected
    if (e.target.value === 'Admin') {
      navigate('/login');
    }
  };

  return (
    <div className="landing-page-container">
      <div className="landing-page-box">
        <img
          className="landing-page-image"
          src="https://img.freepik.com/premium-vector/event-management-wedding-planner-manager-planning-event-conference-party_501813-2157.jpg"
          alt="Your Image"
        />
        <form className="landing-page-form">
          <h3 className='text-center heading-em'>Welcome To Event Management</h3>
          <select
            className="login-select"
            value={selectedOption}
            onChange={handleChange} // Change event handler
          >
            <option value="">Select Role</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
          {/* <button type="button" className='login-button' onClick={handleLogin}>Login</button> */}
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
