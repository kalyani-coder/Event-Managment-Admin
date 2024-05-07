import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from React Router
import './LandingPage.css';

const LandingPage = () => {
    const  navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState('');
 
  const handleLogin = () => {
    if (selectedOption === '') {
      alert('Please select an option');
    } else {
      // Navigate based on the selected option
      if (selectedOption === 'Admin') {
        navigate('/login'); // Navigate to admin login page
      } else if (selectedOption === 'Manager') {
        navigate('/manager/login'); // Navigate to manager login page
      }
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
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="button" className='login-button' onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
