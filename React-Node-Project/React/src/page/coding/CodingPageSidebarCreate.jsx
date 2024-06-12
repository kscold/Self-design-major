import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postCodingSidebar } from '../../api';

const CodingPageSidebarCreate = () => {
  const [input, setInput] = useState({
    sidebarName: '',
    parentId: '',
  });
  const navigate = useNavigate();
  const { sidebarName, parentId } = input;

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitPostData = async (e) => {
    e.preventDefault();
    await postCodingSidebar({ sidebarName, parentId });
    navigate('/coding'); // 사이드바를 생성한 후 코딩 페이지로 이동
  };

  return (
    <div>
      <form onSubmit={onSubmitPostData}>
        <input
          type="text"
          name="sidebarName"
          onChange={onChange}
          value={sidebarName}
          required
          placeholder="필수 입력 항목"
        />
        <input
          type="text"
          name="parentId"
          onChange={onChange}
          value={parentId}
          placeholder="옵션"
        />
        <button type="submit">사이드바 생성</button>
      </form>
    </div>
  );
};

export default CodingPageSidebarCreate;
