import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container text-center mt-5">
    <h1>Welcome to HealthifyMe</h1>
    <div className="mt-4">
      <Link to="/login" className="btn btn-primary mr-2">Login</Link>
      <Link to="/register" className="btn btn-secondary">Register</Link>
    </div>
  </div>
);

export default Home;