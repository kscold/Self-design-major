import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import AlertModal from '../../components/modals/AlertModal';
import { setIsLoggedIn, setNickname, setRole } from '../../redux/user';

const Login = () => {
  const [input, setInput] = useState({
    loginId: '',
    password: '',
  });
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { loginId, password } = input;
    try {
      const response = await axios.post('/api/auth/login', {
        loginId,
        password,
      });
      setStatus(response.status);

      if (response.status === 200) {
        Cookies.set('authToken', response.data.token); // Store token in cookies
        dispatch(setNickname(response.data.nickname)); // Store nickname in Redux
        dispatch(setRole(response.data.role)); // Store role in Redux
        dispatch(setIsLoggedIn(true));
        setShowModal(true);
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      setStatus(error.response ? error.response.status : 500);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className="login-card-front">
      <div className="login-form-item-container">
        <h4 className="login-title">로그인</h4>
        <form className="login-input-form" onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              className="login-input-form-style"
              placeholder="아이디"
              name="loginId"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="login-input-form-style"
              placeholder="비밀번호"
              name="password"
              onChange={onChange}
            />
          </div>
          <div className="login-button-container">
            <button className="login-button" type="submit">
              로그인
            </button>
          </div>
        </form>
        {status && status !== 200 && (
          <div className="login-error-message">로그인에 실패했습니다.</div>
        )}
        {status === 200 && showModal && (
          <AlertModal
            message="로그인에 성공했습니다."
            onClose={closeModal}
            closeMessage="홈으로 이동"
            to="/"
          />
        )}
      </div>
    </div>
  );
};

export default Login;
