import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetSelectedSidebar, GetSidebarData } from '../redux/coding';
import axios from 'axios';
import Cookies from 'js-cookie';

const SideBarItem = ({ item, depth = 0 }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newSidebarName, setNewSidebarName] = useState(item.sidebarName);
  const depthClass = `depth-${depth}`;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);

  const toggleCollapse = () => {
    setCollapsed((prevValue) => !prevValue);
  };

  const isActive = () => {
    return (
      location.pathname === item.url || location.pathname.startsWith(item.url)
    );
  };

  const handleItemClick = () => {
    dispatch(SetSelectedSidebar(item.sidebarId));
    if (item.children && item.children.length > 0) {
      toggleCollapse(); // 자식이 있으면 toggleCollapse 실행
    }
    navigate(item.url);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `/api/coding/sidebar/${item.sidebarId}`,
        { sidebarName: newSidebarName },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        }
      );
      setIsEditing(false);
      item.sidebarName = newSidebarName;
      dispatch(GetSidebarData()); // Fetch updated sidebar data
    } catch (error) {
      console.error('Error updating sidebar item:', error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`/api/coding/sidebar/${item.sidebarId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      });
      dispatch(GetSidebarData()); // Fetch updated sidebar data
    } catch (error) {
      console.error('Error deleting sidebar item:', error);
    }
  };

  return (
    <div>
      <div
        className={`sidebar-title ${depthClass} ${isActive() ? 'active' : ''}`}
        onClick={handleItemClick}
      >
        {isEditing ? (
          <input
            type="text"
            value={newSidebarName}
            onChange={(e) => setNewSidebarName(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEditSubmit();
            }}
            autoFocus
          />
        ) : (
          <div className="sidebar-item-content">
            <span>{item.sidebarName}</span>
            {role === 'admin' && !isEditing && (
              <div className="admin-buttons">
                <button
                  className="sidebar-item-edit-button"
                  onClick={handleEditClick}
                >
                  수정
                </button>
                <button
                  className="sidebar-item-delete-button"
                  onClick={handleDeleteClick}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>
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
