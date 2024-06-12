import React from 'react';
import SideBar from '../../layout/SideBar';
import { Outlet } from 'react-router-dom';

const Conding = () => {
  return (
    <div className="coding-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="coding-page-continaer">
        <Outlet />
      </div>
    </div>
  );
};

export default Conding;
