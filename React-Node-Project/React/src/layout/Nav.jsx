import React from 'react';
import logo from '../assets/images/logo.png';

import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const loaction = useLocation();
  const isMainPage = loaction.pathname === '/';

  return (
    <nav
      className={
        isMainPage
          ? 'nav-container main-nav-container'
          : 'nav-container other-nav-container'
      }
    >
      <div className="logo-container">
        <img src={logo} className="logo" alt="Logo" />
      </div>
      <ul className="list-container ">
        <li className="list-item">
          <Link to="/">Home</Link>
        </li>
        {/* <li className="list-item">
          <Link to="/life">life</Link>
        </li> */}
        <li className="list-item">
          <Link to="/coding">coding</Link>
        </li>
        {/* <li className="list-item">
          <Link to="/photo">photo</Link>
        </li> */}
        <li className="list-item">
          <Link to="/info">info</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
