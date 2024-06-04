import React from 'react';
import profilePicture from '../../assets/images/profile.jpg';

const Info = () => {
  return (
    <div className="info-container">
      <div className="profile-section">
        <img src={profilePicture} alt="Profile" className="profile-picture" />
        <h1 className="profile-name">김승찬(KIM SEUNG CHAN)</h1>
        <p className="profile-text">
          안녕하세요! 러닝 커브를 즐기는 웹 개발자 김승찬입니다.
          <br />
          <div className="profile-skill-text">
            <img
              src="https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=black"
              className="profile-skill"
            />
            <img
              src="https://img.shields.io/badge/spring-6DB33F?logo=spring&logoColor=white"
              className="profile-skill"
            />
            <img
              src="https://img.shields.io/badge/node.js-339933?logo=Node.js&logoColor=white"
              className="profile-skill"
            />
            를 사용한 풀스택 개발을 주로 하고 있습니다.
          </div>
        </p>
        <div className="contact-text">
          <h2 className="contact-title-text">Contact</h2>
          <img
            src="http://img.shields.io/badge/-ks_cold-white?logo=Instagram&link=https://instagram.com/ks_cold/"
            alt="Instagram"
            className="contact-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
