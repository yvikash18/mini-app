import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import './ProgressBar.css';

interface ProgressBarProps {
  progress: number; // 0-100
  message?: string;
  detail?: string;
  isVisible: boolean;
  type?: 'loading' | 'error';
  onClose?: () => void;
}

export const ProgressBar: FC<ProgressBarProps> = ({ 
  
  message = 'Loading...', 
  detail,
  isVisible,
  type = 'loading',
  onClose
}) => {
  if (!isVisible) return null;

  if (type === 'error') {
    return (
      <div className="error-overlay">
        <div className="error-container">
          <button className="error-close-button" onClick={onClose}>
            ×
          </button>
          <div className="error-icon">
            <FontAwesomeIcon icon={faTriangleExclamation} />
          </div>
          <div className="error-title">Transaction Declined</div>
          <div className="error-message">
            {message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="progress-overlay">
      <div className="progress-container">
        <div className="progress-spinner"></div>
        <div className="progress-message">Preparing Transaction</div>
        <div className="progress-message2">{message}</div>
        {detail && <div className="progress-detail">{detail}</div>}
       
      </div>
    </div>
  );
};
