import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import postData from '../../postData.json';

const CodingPageDetail = () => {
  const { section, contentId } = useParams();
  const [detailData, setDetailData] = useState({
    contentId: '',
    title: '',
    content: '',
  });

  useEffect(() => {
    const sectionData = postData.find((item) => item.section === section);
    if (sectionData) {
      const contentData = sectionData.childrens.find(
        (item) => item.contentId === contentId
      );
      setDetailData(contentData);
      console.log('contentData', contentData);
    }
  }, [section, contentId]);

  return (
    <div className="coding-page-detail-container">
      <h2>{detailData.title}</h2>
      <p>{detailData.content}</p>
    </div>
  );
};

export default CodingPageDetail;
