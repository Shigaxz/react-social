import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close mr-4" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
        {children}
          </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
