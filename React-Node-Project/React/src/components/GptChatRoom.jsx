import React from 'react';

const GptChatRoom = ({ messages, messagesEndRef }) => {
  return (
    <>
      {messages.map((message, index) => (
        <div key={index} className={`chat-message`}>
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
  );
};

export default GptChatRoom;
