import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact'
import WorkoutsRedux from './components/WorkoutsRedux';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Impressum from './components/Impressum'
import CookieNotice from './components/CookieNotice';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // const [cookies, setCookies] = useCookies(['user'])


  return (
    <>
      <CookieNotice />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/workout" element={<WorkoutsRedux />} />
        </Route>
      </Routes>
      <Impressum />
    </>
  );
}

export default App;
