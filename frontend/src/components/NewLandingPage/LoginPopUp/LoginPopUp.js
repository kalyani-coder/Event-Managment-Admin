import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../NewLandingPage/LoginPopUp/LoginPopUp.css';
import { RxCross2 } from "react-icons/rx";

const LoginPopUp = ({ setshowLoginPopUp }) => {
  const [currState, setCurrState] = useState('Login');
  const [role, setRole] = useState(''); // Track selected role

  const navigate = useNavigate(); // Hook for navigation

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setCurrState('Redirect'); // Switch to redirect state
  };

  const handleRedirect = () => {
    if (role === 'admin') {
      navigate('/login'); // Navigate to the login page
    } else if (role === 'manager') {
      window.location.href="https://manager.ssdpune.org" // Navigate to the manager page
    }
  };

  // Call handleRedirect once role is set
  React.useEffect(() => {
    if (currState === 'Redirect') {
      handleRedirect();
    }
  }, [currState]);

  return (
    <div className='login-popup'>
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState === 'Login' ? 'Select Role' : 'Redirecting...'}</h2>
          <RxCross2 className='cross-btn' size={25} onClick={() => setshowLoginPopUp(false)} />
        </div>
        <div className="login-popup-inputs">
          {currState === 'Login' ? (
            <div className="role-selection">
              <button type="button" onClick={() => handleRoleSelect('manager')}>Login as Manager</button>
              <button type="button" onClick={() => handleRoleSelect('admin')}>Login as Admin</button>
            </div>
          ) : (
            <p>Redirecting...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPopUp;
