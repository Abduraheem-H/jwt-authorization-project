import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (isAuth) => {
    setIsAuthenticated(isAuth);
  };

  const isAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/verify', {
        method: 'GET',
        headers: { token: localStorage.getItem('token') || '' } 
      });

      const parseRes = await response.json();
      setIsAuthenticated(parseRes === true); 
    } catch (error) {
      console.error('Error verifying authentication:', error.message);
      setIsAuthenticated(false); // set isAuthenticated to false to prevent the user from logging in again later when authentication fails
    }
  };

  useEffect(() => {
    isAuth(); 
  }, []);

  return (
    <Fragment>
      <Router>
        <ToastContainer/>
        <div className="container">
          <Routes>
            <Route
              path="/login"
              element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/register"
              element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
