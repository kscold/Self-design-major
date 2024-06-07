import { useNavigate } from 'react-router-dom';

const AlertModal = ({ message, onClose, closeMessage, to }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (to) {
      navigate(to);
    }
    onClose();
  };

  return (
    <div className="alert-modal-container">
      <div className="alert-modal">
        <div className="alert-modal-content">
          <p>{message}</p>
          <button onClick={handleClose}>{closeMessage}</button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
