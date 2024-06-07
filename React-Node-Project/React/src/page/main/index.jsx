import React from 'react';
import video from '../../assets/images/video.mp4';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  return (
    <>
      <video autoPlay loop muted playsInline className="back-video">
        <source src={video} type="video/mp4" />
      </video>

      <div className="main-text-content">
        <h1>ks Cold</h1>
        <div onClick={() => navigate('/login')} className="Entrance-text">
          Entrance
        </div>
      </div>
    </>
  );
};

export default Main;
