import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AdminChatList = ({ onSelectChat }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users', {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        });
        console.log('받아온 userData', response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

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
