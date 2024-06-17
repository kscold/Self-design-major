import SideBar from '../../layout/SideBar';
import { Outlet, useLocation } from 'react-router-dom';

const Coding = () => {
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/detail/');

  return (
    <div className="coding-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div
        className={`${
          isDetailPage
            ? 'coding-page-container start'
            : 'coding-page-container center'
        } `}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Coding;
