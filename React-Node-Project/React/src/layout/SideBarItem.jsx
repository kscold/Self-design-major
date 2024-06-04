import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideBarItem = ({ item, depth = 0 }) => {
  const [collapsed, setCollapsed] = useState(true);
  const depthClass = `depth-${depth}`;
  const location = useLocation();

  const toggleCollapse = () => {
    setCollapsed((prevValue) => !prevValue);
  };

  const isActive = () => {
    return location.pathname.includes(item.url);
  };

  if (item.chidren) {
    return (
      <div>
        <div
          className={`sidebar-title ${depthClass} ${
            isActive() ? 'active' : ''
          }`}
          onClick={toggleCollapse}
        >
          {item.sidebarName}
        </div>
        <div className={`sidebar-sub-container ${collapsed ? '' : 'open'}`}>
          <SideBarItem
            item={item.chidren}
            depth={depth + 1}
            key={item.chidren.menuId}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`sidebar-title ${depthClass} ${isActive() ? 'active' : ''}`}
      >
        <Link to={item.url} className="sidebar-link">
          {item.sidebarName}
        </Link>
      </div>
    );
  }
};

export default SideBarItem;
