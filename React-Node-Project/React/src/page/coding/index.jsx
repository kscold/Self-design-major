import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SideBar from '../../layout/SideBar';

const Coding = () => {
  const location = useLocation();
  const isDetailOrSidebarPage =
    location.pathname.includes('/detail/') ||
    location.pathname.includes('/sidebar');

  return (
    <div className="coding-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div
        className={`${
          isDetailOrSidebarPage
            ? 'coding-page-container start'
            : 'coding-page-container center'
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Coding;
