import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import AdminChatList from './AdminChatList';
import axios from 'axios';
import Cookies from 'js-cookie';
import UserChatRoom from './UserChatRoom';
import GptChatRoom from './GptChatRoom';

const socket = io('http://localhost:8080', {
  path: '/socket.io',
  withCredentials: true,
});

const generateRoomName = (user1, user2) => {
  return [user1, user2].sort().join('_');
};

const ChatWindow = () => {
  const { nickname, role } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChatMode, setSelectedChatMode] = useState('kscold');
  const [activeUser, setActiveUser] = useState(
    role === 'admin' ? null : 'kscold'
  ); // 활성화된 유저 상태
  const messagesEndRef = useRef(null);

  const handleMessageReceive = (msg) => {
    console.log('받은 메세지:', msg);
    setMessages((prevMessages) => [...prevMessages, msg]);
    scrollToBottom();
  };

  useEffect(() => {
    if (!nickname || !activeUser) return;

    const room = generateRoomName(nickname, activeUser || 'kscold');
    console.log('방 이름', room);
    socket.emit('joinRoom', room);

    socket.on('chat', handleMessageReceive);

    return () => {
      socket.off('chat', handleMessageReceive);
    };
  }, [nickname, activeUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmitSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageData = {
        message: newMessage,
        to: activeUser || 'kscold', // 보내는 대상 사용자 닉네임
      };
      try {
        await axios.post(
          'http://localhost:8080/api/chat/message',
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

  const handleSelectChat = (userNickname) => {
    setActiveUser(userNickname);
    setMessages([]); // 새로운 대화를 시작할 때 메시지 초기화
  };

  const handleBackToList = () => {
    setActiveUser(null); // activeUser 상태를 초기화하여 리스트로 돌아가기
  };

  return (
    <div className={`chat-window-container visible`}>
      <div className="chat-header">
        <button
          className={`chat-window-mode-switch-button ${
            selectedChatMode === 'kscold' ? 'active' : ''
          }`}
          onClick={() => setSelectedChatMode('kscold')}
        >
          kscold
        </button>
        <button
          className={`chat-window-mode-switch-button ${
            selectedChatMode === 'assistant' ? 'active' : ''
          }`}
          onClick={() => setSelectedChatMode('assistant')}
        >
          Assistant
        </button>

        {role === 'admin' && (
          <button className="back-to-list-button" onClick={handleBackToList}>
            리스트로 돌아가기
          </button>
        )}
        <h1
          className={`chat-window-title ${
            role === 'admin' ? 'chat-window-title' : 'chat-window-title user'
          }`}
        >
          {selectedChatMode === 'assistant' ? '어시스턴트' : '메세지'}
        </h1>
      </div>
      <div className="chat-messages">
        {selectedChatMode === 'assistant' ? (
          <GptChatRoom messages={messages} messagesEndRef={messagesEndRef} />
        ) : role === 'admin' ? (
          activeUser ? (
            <UserChatRoom
              messages={messages}
              setMessages={setMessages}
              activeUser={activeUser}
              messagesEndRef={messagesEndRef}
            />
          ) : (
            <AdminChatList onSelectChat={handleSelectChat} />
          )
        ) : (
          <UserChatRoom
            messages={messages}
            setMessages={setMessages}
            activeUser={'kscold'}
            messagesEndRef={messagesEndRef}
          />
        )}
      </div>

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
    </div>
  );
};

export default ChatWindow;
