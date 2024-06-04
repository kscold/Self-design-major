import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import postData from '../../postData.json';

const CodingPageList = () => {
  const [sectionList, setSectionList] = useState([]);
  const { section } = useParams();

  useEffect(() => {
    const sectionData = postData.find((item) => item.section === section);
    console.log('sectionData', sectionData);
    if (sectionData) {
      setSectionList(sectionData.childrens);
    } else {
      setSectionList([]);
    }
  }, [section]);

  return (
    <div className="coding-page-list-container">
      <h2 className="coding-page-list-section-name">{section}</h2>
      <ul className="coding-page-list">
        {sectionList.map((item) => (
          <li key={item.contentId}>
            <Link to={`/coding/${section}/${item.contentId}`}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodingPageList;
