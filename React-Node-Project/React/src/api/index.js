import axios from 'axios';
import Cookies from 'js-cookie';

export const getCodingSidebar = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/coding/sidebar'
    );
    return response.data;
  } catch (error) {
    console.error('코딩 페이지 사이드바 GET 오류:', error);
    return []; // 오류 발생 시 빈 배열 반환
  }
};

export const postCodingSidebar = async ({ sidebarName, parentId }) => {
  const token = Cookies.get('authToken');

  if (!token) {
    console.log('로그인을 진행해야 코딩 페이지 사이드바를 생성할 수 있습니다.');
    return;
  }

  try {
    const response = await axios.post(
      'http://localhost:8080/api/coding/sidebar',
      { sidebarName, parentId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('코딩 페이지 사이드바 POST 오류:', error);
  }
};
