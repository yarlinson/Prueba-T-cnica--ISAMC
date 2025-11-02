import React from 'react';
import './Modal.css';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  message?: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ 
  isOpen, 
  onClose, 
  onAccept,
  message = 'Información importante'
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon info">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#FBBF24" strokeWidth="2" fill="#FEF3C7"/>
            <line x1="12" y1="16" x2="12" y2="12" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round"/>
            <line x1="12" y1="8" x2="12.01" y2="8" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            CANCELAR
          </button>
          <button className="btn-accept" onClick={onAccept}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            ACEPTAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
