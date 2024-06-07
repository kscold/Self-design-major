// src/hooks/useCheckToken.js
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const useCheckToken = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
      if (decodedToken.exp < currentTime) {
        setUserInfo(null); // 토큰 만료
        Cookies.remove('authToken'); // 만료된 토큰 삭제
      } else {
        setUserInfo(decodedToken); // 유효한 토큰일 경우 사용자 정보 저장
      }
    } else {
      setUserInfo(null); // 토큰 없음
    }
  }, []);

  return userInfo;
};

export default useCheckToken;
