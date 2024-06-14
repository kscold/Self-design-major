import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const CodingPagePostCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    images: '',
    sidebarId: '', // 사이드바 ID를 저장하는 상태
  });
  const [file, setFile] = useState(null);
  const [sidebarOptions, setSidebarOptions] = useState([]); // 사이드바 옵션 목록을 저장하는 상태

  const navigate = useNavigate();

  // 사이드바 옵션 목록을 가져오는 함수
  const fetchSidebarOptions = async () => {
    try {
      const response = await axios.get('/api/coding/sidebar');
      setSidebarOptions(response.data);
    } catch (error) {
      console.error('Error fetching sidebar options:', error);
    }
  };

  // 컴포넌트가 마운트될 때 한 번 호출하여 사이드바 옵션 목록을 가져옴
  useEffect(() => {
    fetchSidebarOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append('title', formData.title);
    postData.append('content', formData.content);
    postData.append('sidebarId', formData.sidebarId); // 선택한 사이드바 ID를 전송
    if (file) {
      postData.append('images', file);
    }

    // 쿠키에서 authToken 가져옴
    const authToken = Cookies.get('authToken');

    try {
      const response = await axios.post('/api/coding/post', postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`, // 헤더에 authToken 추가
        },
      });

      console.log('Post created:', response.data);
      navigate('/coding');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="coding-page-post-create-container">
      <h2>글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">이미지 업로드</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div className="form-group">
          <label htmlFor="sidebarId">사이드바 선택</label>
          <select
            id="sidebarId"
            name="sidebarId"
            value={formData.sidebarId}
            onChange={handleChange}
            required
          >
            <option value="">사이드바 선택</option>
            {sidebarOptions.map((option) => (
              <option key={option.sidebarId} value={option.sidebarId}>
                {option.sidebarName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">글 작성 완료</button>
      </form>
    </div>
  );
};

export default CodingPagePostCreate;
