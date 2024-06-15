import SideBar from '../../layout/SideBar';
import { Outlet } from 'react-router-dom';

const Coding = () => {
  return (
    <div className="coding-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="coding-page-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Coding;
