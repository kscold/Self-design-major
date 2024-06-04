import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import SideBar from './SideBar';

const Layout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const isCodingPage = location.pathname === '/coding';

  return (
    <div
      className={`layout ${isMainPage ? 'hero main-hero' : 'hero other-hero'}`}
    >
      <Nav />
      <main className={`${isMainPage ? 'main-content' : 'content'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
