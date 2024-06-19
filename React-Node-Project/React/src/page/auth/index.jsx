import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import loginLogo from '../../../src/assets/images/login.png';
import joinLogo from '../../../src/assets/images/join.png';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    const loginWrapper = document.querySelector('.login-card-3d-wrapper');
    loginWrapper.style.backgroundColor = isLogin ? '#aaadb1' : '#2a2b38';
  };

  const toggleSignUpOk = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-content">
      <div className="login-section">
        <div className="login-form-container">
          <h2 className="login-title-selection">
            <span>Log In </span>
            <span>Sign Up</span>
          </h2>
          <input
            className="checkbox"
            type="checkbox"
            checked={!isLogin}
            readOnly
          />
          <label onClick={toggleForm}>
            <img
              src={isLogin ? loginLogo : joinLogo}
              alt={isLogin ? 'Login Logo' : 'Join Logo'}
              className="toggle-logo"
            />
          </label>
          <div className="login-card-3d-wrap">
            <div className="login-card-3d-wrapper">
              {isLogin ? (
                <Login />
              ) : (
                <Register toggleSignUpOk={toggleSignUpOk} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
