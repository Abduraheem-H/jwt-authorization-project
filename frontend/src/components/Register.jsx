import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Register = (props) => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = input;

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      });

      const parseRes = await response.json();

      if (response.ok) {
        localStorage.setItem('token', parseRes.jwtToken);
        props.setAuth(true);
        toast.success('Account created successfully! 🎉', { autoClose: 2000 });
      } else {
        toast.error(parseRes.message || 'Registration failed. Try again.');
      }
    } catch (error) {
      toast.error('Server error. Please try again later.');
      console.error(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg rounded-4 bg-white" style={{ width: '400px' }}>
        <h2 className="text-center mb-4 fw-bold text-success">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control rounded-3 p-3"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control rounded-3 p-3"
              placeholder="Email Address"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control rounded-3 p-3"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-3 p-3">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
