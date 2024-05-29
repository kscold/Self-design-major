import React from 'react';
// import '../style/Nav.scss';
import logo from '../assets/images/logo.png';

import { Link, Outlet } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="hero">
      <nav>
        <div className="logo-container">
          <img src={logo} className="logo" alt="Logo" />
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/life">life</Link>
          </li>
          <li>
            <Link to="/conding">conding</Link>
          </li>
          <li>
            <Link to="/poto">poto</Link>
          </li>
          <li>
            <Link to="/info">info</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Nav;
