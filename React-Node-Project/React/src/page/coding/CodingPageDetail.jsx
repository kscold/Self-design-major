// // CodingPageDetail.jsx

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import postDetailData from '../../postDetailData.json';
// import { useLocation } from 'react-router-dom';

// const CodingPageDetail = () => {
//   const { id } = useParams();
//   const [detailData, setDetailData] = useState({
//     codingPostTitle: '',
//     codingPostContent: '',
//     codingPostImages: '',
//   });
//   const location = useLocation();

//   const DetailRender () =>{

//   const mathUrl = location.pathname === postDetailData.url;
//   if (mathUrl)
//     return (
//       <div className="coding-page-detail-container">
//         <h2>{postDetailData.codingPostTitle}</h2>
//         <p>{postDetailData.codingPostContent}</p>
//         {postDetailData.codingPostImages && (
//           <img
//             src={postDetailData.codingPostImages}
//             alt={postDetailData.codingPostTitle}
//           />
//         )}
//       </div>
//     );
//   }
// }

//   useEffect(() => {
//     // Check if the current id matches the id in postDetailData
//     if (postDetailData.codingPostId === id) {
//       setDetailData({
//         codingPostTitle: postDetailData.codingPostTitle,
//         codingPostContent: postDetailData.codingPostContent,
//         codingPostImages: postDetailData.codingPostImages,
//       });
//     } else {
//       setDetailData({
//         codingPostTitle: 'Not Found',
//         codingPostContent: '해당 포스트를 찾을 수 없습니다.',
//         codingPostImages: '',
//       });
//     }
//   }, [id]);

//   return (
//     <div className="coding-page-detail-container">
//       <h2>{detailData.codingPostTitle}</h2>
//       <p>{detailData.codingPostContent}</p>
//       {detailData.codingPostImages && (
//         <img
//           src={detailData.codingPostImages}
//           alt={detailData.codingPostTitle}
//         />
//       )}
//     </div>
//   );
// };

// export default CodingPageDetail;

import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import postDetailData from '../../postDetailData.json';

const CodingPageDetail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({
    codingPostTitle: '',
    codingPostContent: '',
    codingPostImages: '',
  });
  const location = useLocation();

  useEffect(() => {
    // Check if the current URL matches the URL in postDetailData
    const matchedUrl = `/coding/JavaScript/detail/${id}` === postDetailData.url;
    console.log(matchedUrl);
    if (matchedUrl) {
      setDetailData({
        codingPostTitle: postDetailData.codingPostTitle,
        codingPostContent: postDetailData.codingPostContent,
        codingPostImages: postDetailData.codingPostImages,
      });
    } else {
      setDetailData({
        codingPostTitle: 'Not Found',
        codingPostContent: '해당 포스트를 찾을 수 없습니다.',
        codingPostImages: '',
      });
    }
  }, [id, location.pathname]);

  return (
    <div className="coding-page-detail-container">
      <h2>{detailData.codingPostTitle}</h2>
      <p>{detailData.codingPostContent}</p>
      {detailData.codingPostImages && (
        <img
          src={detailData.codingPostImages}
          alt={detailData.codingPostTitle}
        />
      )}
    </div>
  );
};

export default CodingPageDetail;
