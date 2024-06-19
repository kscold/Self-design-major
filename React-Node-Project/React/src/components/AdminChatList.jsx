// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const AdminChatList = ({ onSelectChat }) => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/users', {
//           headers: {
//             Authorization: `Bearer ${Cookies.get('authToken')}`,
//           },
//         });
//         console.log('users 정보 fetch ', response.data);
//         setUsers(response.data);
//       } catch (error) {
//         console.error('users 정보 fetch 오류', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div className="admin-chat-list">
//       <h2>유저 채팅방</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id} onClick={() => onSelectChat(user.nickname)}>
//             {user.nickname}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminChatList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const AdminChatList = ({ onSelectChat }) => {
  const [users, setUsers] = useState([]);
  const { nickname } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users', {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        });
        console.log('users 정보 fetch ', response.data);
        // admin 유저를 제외한 나머지 유저들만 설정
        const filteredUsers = response.data.filter(
          (user) => user.nickname !== nickname
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error('users 정보 fetch 오류', error);
      }
    };

    fetchUsers();
  }, [nickname]);

  return (
    <div className="admin-chat-list">
      <h2>유저 채팅방</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => onSelectChat(user.nickname)}>
            {user.nickname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminChatList;
