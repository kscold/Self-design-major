// src/layout/Layout.jsx
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import useCheckToken from '../hooks/useCheckToken';
import LoginStateModal from '../components/modals/LoginStateModal';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname } from '../redux/user';

const Layout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.user.nickname);

  const loggedInUserInfo = useCheckToken();

  useEffect(() => {
    if (loggedInUserInfo && loggedInUserInfo.nickname) {
      dispatch(setNickname(loggedInUserInfo.nickname));
    }
  }, [loggedInUserInfo, dispatch]);

  // 유저정보 모달을 안띄우고 싶은 라우팅을 설정
  const noUserModalPaths = ['/login', '/info'];

  // 현재 location이랑 같은지 확인
  const showModal = !noUserModalPaths.includes(location.pathname);

  return (
    <div
      className={`layout ${isMainPage ? 'hero main-hero' : 'hero other-hero'}`}
    >
      <Nav />
      <main className={`${isMainPage ? 'main-content' : 'content'}`}>
        <Outlet />
      </main>
      {nickname && showModal && <LoginStateModal nickname={nickname} />}
    </div>
  );
};

export default Layout;
