import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CodingPageDetail = ({ id }) => {
  const [detailData, setDetailData] = useState(null);
  const selectedSidebarId = useSelector(
    (state) => state.coding.selectedSidebarId
  );

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(
          `/api/coding/post/${selectedSidebarId}/${id}`
        );
        const postData = response.data;

        // API로 받아온 데이터를 상태에 저장
        setDetailData({
          codingPostTitle: postData.codingPostTitle,
          codingPostContent: postData.codingPostContent,
          codingPostImages: postData.codingPostImages[0], // 여기서는 이미지 배열의 첫 번째 이미지만 사용
        });
      } catch (error) {
        console.error('Error fetching post detail:', error);
        setDetailData({
          codingPostTitle: 'Not Found',
          codingPostContent: '해당 포스트를 찾을 수 없습니다.',
          codingPostImages: '',
        });
      }
    };

    fetchPostDetail();
  }, [id]);

  if (!detailData) {
    return (
      <div className="coding-page-detail-container">
        <p>Loading...</p>
      </div>
    );
  }

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

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import ReactMarkdown from 'react-markdown';
// import rehypeHighlight from 'rehype-highlight';
// import rehypeRaw from 'rehype-raw';

// const CodingPageDetail = ({ id }) => {
//   const [detailData, setDetailData] = useState(null);
//   const selectedSidebarId = useSelector(
//     (state) => state.coding.selectedSidebarId
//   );

//   useEffect(() => {
//     const fetchPostDetail = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/coding/post/${selectedSidebarId}/${id}`
//         );
//         const postData = response.data;

//         // API로 받아온 데이터를 상태에 저장
//         setDetailData({
//           codingPostTitle: postData.codingPostTitle,
//           codingPostContent: postData.codingPostContent,
//           codingPostImages: postData.codingPostImages[0], // 여기서는 이미지 배열의 첫 번째 이미지만 사용
//         });
//       } catch (error) {
//         console.error('Error fetching post detail:', error);
//         setDetailData({
//           codingPostTitle: 'Not Found',
//           codingPostContent: '해당 포스트를 찾을 수 없습니다.',
//           codingPostImages: '',
//         });
//       }
//     };

//     fetchPostDetail();
//   }, [id, selectedSidebarId]);

//   if (!detailData) {
//     return (
//       <div className="coding-page-detail-container">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="coding-page-detail-container">
//       <h2>{detailData.codingPostTitle}</h2>
//       <ReactMarkdown
//         rehypePlugins={[rehypeHighlight, rehypeRaw]}
//         components={{
//           code({ node, inline, className, children, ...props }) {
//             const match = /language-(\w+)/.exec(className || '');
//             return !inline && match ? (
//               <pre data-language={match[1]}>
//                 <code className={className} {...props}>
//                   {children}
//                 </code>
//               </pre>
//             ) : (
//               <code className={className} {...props}>
//                 {children}
//               </code>
//             );
//           },
//         }}
//       >
//         {detailData.codingPostContent}
//       </ReactMarkdown>
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
