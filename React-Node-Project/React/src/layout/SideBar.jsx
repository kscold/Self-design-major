// import React, { useEffect, useState } from 'react';
// import SideBarItem from './SideBarItem';
// import { getCodingSidebar, postCodingSidebar } from '../api';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const SideBar = () => {
//   const [sidebarData, setSidebarData] = useState([]);
//   const nickname = useSelector((state) => state.user.nickname);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const data = await getCodingSidebar();
//     setSidebarData(data);
//   };

//   const onClickPostSidebar = () => {
//     navigate('/coding/sidebar');
//   };

//   return (
//     <>
//       {nickname && <button onClick={onClickPostSidebar}>+</button>}
//       {sidebarData.length > 0 ? (
//         sidebarData.map((item) => (
//           <SideBarItem item={item} key={item.sidebarId} />
//         ))
//       ) : (
//         <div>사이드바 항목이 없습니다.</div>
//       )}
//     </>
//   );
// };

// export default SideBar;

import React, { useEffect, useState } from 'react';
import SideBarItem from './SideBarItem';
import { getCodingSidebar } from '../api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const [sidebarData, setSidebarData] = useState([]);
  const nickname = useSelector((state) => state.user.nickname);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getCodingSidebar();
    setSidebarData(data);
  };

  const onClickPostSidebar = () => {
    navigate('/coding/sidebar');
  };

  return (
    <>
      {nickname && <button onClick={onClickPostSidebar}>+</button>}
      {sidebarData.length > 0 ? (
        sidebarData.map((item) => (
          <SideBarItem item={item} key={item.sidebarId} />
        ))
      ) : (
        <div>사이드바 항목이 없습니다.</div>
      )}
    </>
  );
};

export default SideBar;
