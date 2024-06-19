import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetSidebarData } from '../redux/coding';
import SideBarItem from './SideBarItem';

const SideBar = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.user);
  const sidebarData = useSelector((state) => state.coding.sidebarData);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetSidebarData());
  }, [dispatch]);

  useEffect(() => {
    const refreshSidebarData = () => {
      dispatch(GetSidebarData());
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshSidebarData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch]);

  const onClickSidebarPost = () => {
    navigate('/coding/sidebar');
  };

  const onClickCodingPost = () => {
    navigate('/coding/post');
  };

  return (
    <>
      {role === 'admin' && (
        <div className="sidbar-admin-button-container">
          <button
            className="sidebar-create-button"
            onClick={onClickSidebarPost}
          >
            사이드바 +
          </button>
          <button
            className="sidebar-post-create-button"
            onClick={onClickCodingPost}
          >
            글쓰기 +
          </button>
        </div>
      )}
      {sidebarData.length > 0 ? (
        sidebarData.map((item) => (
          <SideBarItem item={item} key={item.sidebarId} />
        ))
      ) : (
        <div>사이드바 항목이 없습니다.</div>
      )}
    </>
  );
};

export default SideBar;
