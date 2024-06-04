import React from 'react';
import video from '../../assets/images/video.mp4';

const Main = () => {
  return (
    <>
      <video autoPlay loop muted playsInline className="back-video">
        <source src={video} type="video/mp4" />
      </video>

      <div className="main-text-content">
        <h1>ks Cold</h1>
        <a>Explore</a>
      </div>
    </>
  );
};

export default Main;
