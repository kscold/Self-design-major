import React from 'react';
import menuData from '../menuData.json';
import SideBarItem from './SideBarItem';

const SideBar = () => {
  return (
    <div className="sidebar-container">
      {menuData.map((item, index) => (
        <SideBarItem item={item} key={index} />
      ))}
    </div>
  );
};

export default SideBar;
