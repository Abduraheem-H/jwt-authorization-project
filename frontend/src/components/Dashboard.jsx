import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');

  // Get user name
  const getUserName = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard', {
        method: 'GET',
        headers: { token: localStorage.token }
      });
      const parseRes = await response.json();

      if (response.ok) {
        setName(parseRes.user_name);
      } else {
        toast.error(parseRes.message || 'Failed to fetch user data.');
      }
    } catch (error) {
      toast.error('Server error. Please try again.');
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserName();
  }, []); // Run only once

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success('Logged out successfully! 👋', { autoClose: 2000 });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg rounded-4 bg-white" style={{ width: '400px' }}>
        <h2 className="text-center mb-4 fw-bold text-success">
          {name ? `Welcome, ${name}!` : 'Loading...'}
        </h2>
        <button onClick={onSubmit} className="btn btn-danger w-100 rounded-3 p-3">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
