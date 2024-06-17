import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CodingPageDetail from './CodingPageDetail';

const CodingPageList = () => {
  const { section0, section1, section2, section3, section4, id } = useParams();
  const [sectionData, setSectionData] = useState([]);
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/detail/');
  const selectedSidebarId = useSelector(
    (state) => state.coding.selectedSidebarId
  );

  useEffect(() => {
    let sectionPath = `/coding/${section0}`;
    if (section1) sectionPath += `/${section1}`;
    if (section2) sectionPath += `/${section2}`;
    if (section3) sectionPath += `/${section3}`;
    if (section4) sectionPath += `/${section4}`;

    // API 호출을 위한 경로 생성
    const apiPath = `/api/coding/post/${selectedSidebarId}`;

    // Axios를 사용하여 백엔드 API 호출
    axios
      .get(apiPath)
      .then((response) => {
        setSectionData(response.data.childrens);
      })
      .catch((error) => {
        console.error('Error fetching section data:', error);
        setSectionData([]);
      });
  }, [section0, section1, section2, section3, section4]);

  // 디테일 페이지인지
  if (isDetailPage) {
    return <CodingPageDetail id={id} />;
  }

  return (
    <div className="coding-page-list-container">
      <h2 className="coding-page-list-section-name">
        {section4 || section3 || section2 || section1 || section0} 포스트
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
