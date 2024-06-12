// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const SideBarItem = ({ item, depth = 0 }) => {
//   const [collapsed, setCollapsed] = useState(true);
//   const depthClass = `depth-${depth}`;
//   const location = useLocation();

//   const toggleCollapse = () => {
//     setCollapsed((prevValue) => !prevValue);
//   };

//   const isActive = () => {
//     return location.pathname.includes(item.url);
//   };

//   return (
//     <div>
//       <div
//         className={`sidebar-title ${depthClass} ${isActive() ? 'active' : ''}`}
//         onClick={toggleCollapse}
//       >
//         {item.sidebarName}
//       </div>
//       {item.children && (
//         <div className={`sidebar-sub-container ${collapsed ? '' : 'open'}`}>
//           {item.children.map((child) => (
//             <SideBarItem item={child} depth={depth + 1} key={child.sidebarId} />
//           ))}
//         </div>
//       )}
//       {!item.children && (
//         <div
//           className={`sidebar-title ${depthClass} ${
//             isActive() ? 'active' : ''
//           }`}
//         >
//           <Link to={item.url} className="sidebar-link">
//             {item.sidebarName}
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SideBarItem;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideBarItem = ({ item, depth = 0 }) => {
  const [collapsed, setCollapsed] = useState(true);
  const depthClass = `depth-${depth}`;
  const location = useLocation();

  const toggleCollapse = () => {
    setCollapsed((prevValue) => !prevValue);
  };

  const isActive = () => {
    return location.pathname.includes(item.url);
  };

  return (
    <div>
      {item.children && item.children.length > 0 ? (
        <div
          className={`sidebar-title ${depthClass} ${
            isActive() ? 'active' : ''
          }`}
          onClick={toggleCollapse}
        >
          {item.sidebarName}
        </div>
      ) : (
        <Link to={item.url} className="sidebar-link">
          <div
            className={`sidebar-title ${depthClass} ${
              isActive() ? 'active' : ''
            }`}
          >
            {item.sidebarName}
          </div>
        </Link>
      )}
      {item.children && (
        <div className={`sidebar-sub-container ${collapsed ? '' : 'open'}`}>
          {item.children.map((child) => (
            <SideBarItem item={child} depth={depth + 1} key={child.sidebarId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBarItem;
