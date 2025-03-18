import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = (props) => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const { email, password } = input;

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
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
        toast.success('Login successful! 🎉', { autoClose: 2000 });
      } else {
        toast.error(parseRes.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('Server error. Please try again later.');
      console.error(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg rounded-4 bg-white" style={{ width: '400px' }}>
        <h2 className="text-center mb-4 fw-bold text-success">Login</h2>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
