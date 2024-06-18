// // components/mddals/LogingStateModal.jsx
// import React, { useState } from 'react';
// import ChatWindow from '../ChatWindow';

// const LoginStateModal = ({ nickname }) => {
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   const onClickExtendModal = () => {
//     setIsChatOpen(!isChatOpen);
//   };

//   return (
//     <div>
//       <div className="login-state-modal-container" onClick={onClickExtendModal}>
//         <p>{nickname}</p>
//       </div>
//       {isChatOpen && <ChatWindow nickname={nickname} />}
//     </div>
//   );
// };

// export default LoginStateModal;

// components/modals/LoginStateModal.jsx
import React, { useState } from 'react';
import ChatWindow from '../ChatWindow';

const LoginStateModal = ({ nickname, role }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const onClickExtendModal = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <div className="login-state-modal-container" onClick={onClickExtendModal}>
        <p>{nickname}</p>
      </div>
      {isChatOpen && <ChatWindow nickname={nickname} role={role} />}
    </div>
  );
};

export default LoginStateModal;
