import axios from 'axios';
import { useState } from 'react';
import AlertModal from '../../components/modals/AlertModal';

const Register = ({ toggleSignUpOk }) => {
  const [input, setInput] = useState({
    nickname: '',
    loginId: '',
    password: '',
  });
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { nickname, loginId, password } = input;
    try {
      const response = await axios.post('/api/auth/join', {
        nickname,
        loginId,
        password,
      });
      console.log(response.data);
      setStatus(response.status);

      if (response.status === 200) {
        console.log('회원가입 성공');
        setShowModal(true); // 모달 표시
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      if (error.response && error.response.status === 409) {
        setStatus(409);
      } else {
        setStatus(error.response ? error.response.status : 500);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    toggleSignUpOk(); // 로그인 폼으로 전환
  };

  return (
    <div className="login-card-back">
      <div className="login-form-item-container">
        <h4 className="login-title">회원가입</h4>
        <form className="login-input-form" onSubmit={onSubmit}>
          <div>
            <input
              name="nickname"
              type="text"
              className="login-input-form-style"
              placeholder="닉네임"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              name="loginId"
              type="text"
              className="login-input-form-style"
              placeholder="아이디"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              className="login-input-form-style"
              placeholder="비밀번호"
              onChange={onChange}
            />
          </div>
          <div className="login-button-container">
            <button type="submit" className="login-button">
              회원가입
            </button>
          </div>
        </form>

        {status === 409 && (
          <div className="login-error-message">이미 있는 계정입니다.</div>
        )}

        {status && status !== 409 && status !== 200 && (
          <div className="login-error-message">회원가입 실패했습니다.</div>
        )}

        {status === 200 && showModal && (
          <AlertModal
            message="회원가입이 정상적으로 완료되었습니다."
            closeMessage="로그인"
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
