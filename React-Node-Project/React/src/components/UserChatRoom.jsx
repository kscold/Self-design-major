import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserChatRoom = ({
  messages,
  setMessages,
  activeUser,
  messagesEndRef,
}) => {
  const { nickname } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/chat/messages/${activeUser}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('authToken')}`,
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error('메시지 가져오기 중 오류가 발생했습니다.', error);
      }
    };

    if (activeUser) {
      fetchMessages();
    }
  }, [activeUser, setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat-message ${
            message.from === nickname ? 'sent' : 'received'
          }`}
        >
          <div className="message-content">
            <strong>{message.from} 님</strong>
            <br />
            {message.message}
            <span className="message-timestamp">
              {new Date(message.createdAt).toLocaleTimeString()} 전송됨
            </span>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </>
  );
};

export default UserChatRoom;
