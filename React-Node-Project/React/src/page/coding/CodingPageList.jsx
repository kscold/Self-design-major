// // CodingPageList.jsx

// import React, { useEffect, useState } from 'react';
// import { Link, useParams, Outlet, useLocation } from 'react-router-dom';
// import postData from '../../postData.json';

// const CodingPageList = () => {
//   const { section0, section1, section2, section3, section4 } = useParams();
//   const [sectionData, setSectionData] = useState([]);
//   const location = useLocation();
//   const isDetailPage = location.pathname.includes('/detail/');

//   useEffect(() => {
//     let sectionPath = `/coding/${section0}`;
//     if (section1) sectionPath += `/${section1}`;
//     if (section2) sectionPath += `/${section2}`;
//     if (section3) sectionPath += `/${section3}`;
//     if (section4) sectionPath += `/${section4}`;

//     const section = postData.find((item) => item.url === sectionPath);
//     if (section) {
//       setSectionData(section.childrens);
//     } else {
//       setSectionData([]);
//     }
//   }, [section0, section1, section2, section3, section4]);

//   return (
//     <div className="coding-page-list-container">
//       {!isDetailPage && (
//         <>
//           <h2 className="coding-page-list-section-name">
//             {section4 || section3 || section2 || section1 || section0}
//           </h2>
//           <ul className="coding-page-list">
//             {sectionData.map((item) => (
//               <li key={item.codingPostId}>
//                 <Link to={`detail/${item.codingPostId}`}>
//                   {item.codingPostTitle}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//       <Outlet />
//     </div>
//   );
// };

// export default CodingPageList;

// CodingPageList.jsx

import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import postData from '../../postData.json';

const CodingPageList = () => {
  const { section0, section1, section2, section3, section4 } = useParams();
  const [sectionData, setSectionData] = useState([]);
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/detail/');

  useEffect(() => {
    let sectionPath = `/coding/${section0}`;
    if (section1) sectionPath += `/${section1}`;
    if (section2) sectionPath += `/${section2}`;
    if (section3) sectionPath += `/${section3}`;
    if (section4) sectionPath += `/${section4}`;

    const section = postData.find((item) => item.url === sectionPath);
    if (section) {
      setSectionData(section.childrens);
    } else {
      setSectionData([]);
    }
  }, [section0, section1, section2, section3, section4]);

  if (isDetailPage) {
    return null;
  }

  return (
    <div className="coding-page-list-container">
      <h2 className="coding-page-list-section-name">
        {section4 || section3 || section2 || section1 || section0}
      </h2>
      <ul className="coding-page-list">
        {sectionData.map((item) => (
          <li key={item.codingPostId}>
            <Link to={`detail/${item.codingPostId}`}>
              {item.codingPostTitle}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodingPageList;
