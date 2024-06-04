import React from 'react';
import SideBar from '../../layout/SideBar';
import { Outlet } from 'react-router-dom';

const Conding = () => {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Conding;
