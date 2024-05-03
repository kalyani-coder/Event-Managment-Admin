
import React, { useState, useEffect } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';

const  Login = ()  => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      navigate('/quotation');
    }
  }, []);
  
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
          alert('Email not found');
        } else if (response.status === 401) {
          alert('Incorrect password');
        } else {
          setError(data.message);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Internal server error');
    }
  };

  

  return (
    <section className="vh-75 gradient-custom row d-flex justify-content-center align-items-center"> 
      <div className="container-login py-4 h-75 mr-2">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card-event  text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body-login p-5 text-center">
                <form onSubmit={handleLogin}>
                  <div className="mb-md-5 mt-md-4 pb-5 login-card">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <div data-mdb-input-init className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="typeEmailX">Email</label>
                      <input type="email" id="typeEmailX" placeholder="Enter your email" className="form-control form-control-s" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div data-mdb-input-init className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="typePasswordX">Password</label>
                      <input type="password" id="typePasswordX" placeholder="Enter your password"  className="form-control form-control-s" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-s px-5" type="submit">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
