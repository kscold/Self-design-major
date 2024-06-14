import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SideBarItem = ({ item, depth = 0 }) => {
  const [collapsed, setCollapsed] = useState(true);
  const depthClass = `depth-${depth}`;
  const location = useLocation();
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapsed((prevValue) => !prevValue);
  };

  const isActive = () => {
    // 현재 페이지의 URL과 아이템의 URL이 일치하는지 확인
    if (location.pathname === item.url) {
      return true;
    }
    // 부모 요소의 경우, URL이 부모 요소의 URL을 포함하는지 확인
    if (item.parentId !== null) {
      const parentItem = item.parentId; // 부모 요소 가져오기
      if (location.pathname.startsWith(parentItem.url)) {
        return true;
      }
    }
    // 자식 요소가 있을 경우 자식 요소 중 하나라도 일치하는지 확인
    if (item.children && item.children.length > 0) {
      return item.children.some((child) => location.pathname === child.url);
    }
    return false;
  };

  const handleItemClick = () => {
    if (item.children && item.children.length > 0) {
      toggleCollapse(); // 자식이 있으면 toggleCollapse 실행
    }
    // 부모 항목을 클릭할 때, 부모 항목의 URL로 이동
    if (item.parentId === null) {
      navigate(item.url);
    }
  };

  return (
    <div>
      {item.children && item.children.length > 0 ? (
        <div
          className={`sidebar-title ${depthClass} ${
            isActive() ? 'active' : ''
          }`}
          onClick={handleItemClick}
        >
          {item.sidebarName}
        </div>
      ) : (
        <Link to={item.url} className="sidebar-link">
          <div
            className={`sidebar-title ${depthClass} ${
              isActive() ? 'active' : ''
            }`}
          >
            {item.sidebarName}
          </div>
        </Link>
      )}
      {item.children && (
        <div className={`sidebar-sub-container ${collapsed ? '' : 'open'}`}>
          {item.children.map((child) => (
            <SideBarItem item={child} depth={depth + 1} key={child.sidebarId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBarItem;
