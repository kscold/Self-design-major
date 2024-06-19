import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCodingSidebar } from '../../api';
import { PostSidebarItem } from '../../redux/coding';

const CodingPageSidebarCreate = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    sidebarName: '',
    parentId: '', // parentId를 빈 문자열로 초기화
  });
  const [parentOptions, setParentOptions] = useState([]); // 부모 옵션 목록 저장
  const navigate = useNavigate();
  const { sidebarName, parentId } = input;

  // 컴포넌트가 마운트될 때 한 번 호출하여 부모 옵션 목록을 가져옴
  useEffect(() => {
    fetchParentOptions();
  }, []);

  // 부모 옵션 목록을 가져오는 함수
  const fetchParentOptions = async () => {
    const sidebar = await getCodingSidebar();

    setParentOptions(flattenSidebarOptions(sidebar));
  };

  const flattenSidebarOptions = (options, depth = 0) => {
    let result = [];
    options.forEach((option) => {
      result.push({ ...option, depth });
      if (option.children && option.children.length > 0) {
        result = result.concat(
          flattenSidebarOptions(option.children, depth + 1)
        );
      }
    });
    return result;
  };

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitPostData = (e) => {
    e.preventDefault();
    dispatch(PostSidebarItem({ sidebarName, parentId: parseInt(parentId) }));
    navigate('/coding'); // 코딩 페이지로 이동
  };

  return (
    <div className="create-sidbar-form-container">
      <form onSubmit={onSubmitPostData} className="create-sidbar-form">
        <input
          type="text"
          name="sidebarName"
          onChange={onChange}
          value={sidebarName}
          required
          placeholder="필수 입력 항목"
          className="create-sidbar-form-input"
        />
        <select
          name="parentId"
          onChange={onChange}
          value={parentId}
          className="create-sidbar-form-select"
        >
          <option value="">부모 선택</option>
          {parentOptions.map((parent) => (
            <option key={parent.sidebarId} value={parent.sidebarId}>
              {parent.sidebarName}
            </option>
          ))}
        </select>
        <button type="submit" className="create-sidbar-form-button">
          사이드바 생성
        </button>
      </form>
    </div>
  );
};

export default CodingPageSidebarCreate;
