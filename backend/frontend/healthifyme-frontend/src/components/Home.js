import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";

const Home = () => (
  <div className='home-container'>
    <Helmet>
      <title>HealthifyMe - Your Personal Workout Tracker</title>
      <meta name="description" content="Track and manage your workouts efficiently with HealthifyMe. Plan exercises and monitor progress easily!" />
      <meta name="keywords" content="fitness, workout, exercise, health, gym tracker" />
      <meta name="author" content="Kat Lentge" />
    </Helmet>
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