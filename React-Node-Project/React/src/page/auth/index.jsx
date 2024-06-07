import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    const loginWrapper = document.querySelector('.login-card-3d-wrapper');
    loginWrapper.style.backgroundColor = isLogin ? '#2a2b38' : '#aaadb1';
  };

  const toggleSignUpOk = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-content">
      <div className="login-section">
        <div className="login-form-container">
          <h2 class="login-title-selection">
            <span>Log In </span>
            <span>Sign Up</span>
          </h2>
          <input
            className="checkbox"
            type="checkbox"
            checked={!isLogin}
            readOnly
          />
          <label onClick={toggleForm}></label>
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
