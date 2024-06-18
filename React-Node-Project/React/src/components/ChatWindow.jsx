import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import AdminChatList from './AdminChatList';
import axios from 'axios';
import Cookies from 'js-cookie';

const socket = io('http://localhost:8080', {
  path: '/socket.io',
  withCredentials: true,
});

const ChatWindow = () => {
  const { nickname, role } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChatMode, setSelectedChatMode] = useState('assistant');
  const [activeUser, setActiveUser] = useState(null); // 활성화된 유저 상태
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log(nickname, role);
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmitSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageData = {
        message: newMessage,
      };
      try {
        await axios.post(
          'http://localhost:8080/api/chat/message', // 이 경로를 확인하세요
          messageData,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${Cookies.get('authToken')}`,
            },
          }
        );
        setNewMessage('');
      } catch (error) {
        console.error('메시지 전송 중 오류가 발생했습니다.', error);
      }
    }
  };

  const handleSelectChat = (userId) => {
    setActiveUser(userId);
    setMessages([]); // 유저 선택 시 메시지 초기화
  };

  return (
    <div className={`chat-window-container visible`}>
      <div className="chat-header">
        <button
          className={`chat-window-mode-switch-button ${
            selectedChatMode === 'assistant' ? 'active' : ''
          }`}
          onClick={() => setSelectedChatMode('assistant')}
        >
          Assistant
        </button>
        <button
          className={`chat-window-mode-switch-button ${
            selectedChatMode === 'kscold' ? 'active' : ''
          }
          }`}
          onClick={() => setSelectedChatMode('kscold')}
        >
          kscold
        </button>
        <h1 className="chat-window-title">
          {selectedChatMode === 'assistant' ? '어시스턴트' : '메세지'}
        </h1>
      </div>
      <div className="chat-messages">
        {role === 'admin' ? (
          <AdminChatList onSelectChat={handleSelectChat} />
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${
                  message.user === nickname ? 'sent' : 'received'
                }`}
              >
                <div className="message-content">
                  <strong>{message.user} 님</strong>
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
        )}
      </div>
      {role !== 'admin' && (
        <form className="chat-input" onSubmit={onSubmitSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메세지를 입력하세요"
            className="chat-input-field"
          />
          <button type="submit" className="chat-send-button">
            전송
          </button>
        </form>
      )}
    </div>
  );
};

export default ChatWindow;
