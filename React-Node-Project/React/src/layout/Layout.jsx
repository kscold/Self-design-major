import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import LoginStateModal from '../components/modals/LoginStateModal';
import { useSelector } from 'react-redux';

const Layout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const { nickname, role } = useSelector((state) => state.user);

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
      {nickname && showModal && (
        <LoginStateModal nickname={nickname} role={role} />
      )}
    </div>
  );
};

export default Layout;
