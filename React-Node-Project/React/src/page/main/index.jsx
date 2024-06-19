import React from 'react';
import video from '../../assets/images/video.mp4';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/user';

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <>
      <video autoPlay loop muted playsInline className="back-video">
        <source src={video} type="video/mp4" />
      </video>

      <div className="main-text-content">
        <h1>ks Cold</h1>
        {isLoggedIn ? (
          <div onClick={handleLogout} className="Entrance-text">
            Logout
          </div>
        ) : (
          <div onClick={() => navigate('/login')} className="Entrance-text">
            Entrance
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
