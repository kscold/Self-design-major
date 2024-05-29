import React from 'react';

// import profilePicture from '../style/images/profile.jpg'; // 프로필 사진 추가

const Info = () => {
  return (
    <div className="info-container">
      <div className="profile-section">
        {/* <img src={profilePicture} alt="Profile" className="profile-picture" /> */}
        <h1>John Doe</h1>
        <p className="bio">
          안녕하세요! 러닝 커브를 즐기는 웹 개발자 김승찬입니다.
          <br />
          React, Spring, Node.js를 사용한 풀스택 개발을 주로 하고 있습니다.
        </p>
        <div className="social-links">
          <a
            href="https://www.instagram.com/ks_cold"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default Info;
