import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === 'Admin') {
      navigate('/login');
    } else if (e.target.value === 'Manager') {
      window.location.href = 'https://manager.ssdpune.org';
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
          <h3 className="text-center heading-em">Welcome To Event Management</h3>
          <select
            className="login-select"
            value={selectedOption}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
