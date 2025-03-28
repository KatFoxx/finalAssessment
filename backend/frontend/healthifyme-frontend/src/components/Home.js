import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className='home-container'>
    <img src='../images/healthify-logo.png' alt='' className="background-img" />
    <div className="container text-center mt-5">
      <h1>Welcome to HealthifyMe</h1>
      <div className="button-container">
        <Link to="/login" className="btn login">Login</Link>
        <Link to="/register" className="btn register">Register</Link>
      </div>
    </div>
  </div>
);

export default Home;