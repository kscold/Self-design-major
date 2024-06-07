import React, { useState, useEffect, useRef } from 'react';

const ChatWindow = ({ nickname }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectChatMode, setSelectChatMode] = useState('assistant');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmitSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { sender: nickname, text: newMessage, timestamp: new Date() },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className={`chat-window-container visible`}>
      <div className="chat-header">
        <button
          className={`chat-window-mode-switch-button ${
            selectChatMode === 'assistant' ? 'active' : ''
          }`}
          onClick={() => setSelectChatMode('assistant')}
        >
          Assistant
        </button>
        <button
          className={`chat-window-mode-switch-button ${
            selectChatMode === 'kscold' ? 'active' : ''
          }`}
          onClick={() => setSelectChatMode('kscold')}
        >
          kscold
        </button>
        <h1 className="chat-window-title">
          {selectChatMode === 'assistant' ? '어시스턴트' : '메세지'}
        </h1>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.sender === nickname ? 'sent' : 'received'
            }`}
          >
            <div className="message-content">
              <strong>{message.sender} 님</strong>
              <br />
              {message.text}
              <span className="message-timestamp">
                {message.timestamp.toLocaleTimeString()} 전송됨
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
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
