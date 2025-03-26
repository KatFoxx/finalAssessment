import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import { useCookies } from "react-cookie";
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact'
import Workouts from './components/Workouts';
import Register from './components/Register';
import Navbar from './components/Navbar';

function App() {
  // const [cookies, setCookies] = useCookies(['user'])


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/workout" element={<Workouts />} />
      </Routes>
    </>
  );
}

export default App;
