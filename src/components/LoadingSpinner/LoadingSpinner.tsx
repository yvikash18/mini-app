import { FC } from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  message = 'Loading...' 
}) => {
  const sizeClass = `loading-spinner--${size}`;
  
  return (
    <div className={`loading-spinner ${sizeClass}`}>
      <div className="loading-spinner__circle"></div>
      {message && <p className="loading-spinner__message">{message}</p>}
    </div>
  );
};
