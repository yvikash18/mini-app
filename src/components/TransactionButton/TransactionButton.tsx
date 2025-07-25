import { FC } from 'react';

interface TransactionButtonProps {
  isConnected: boolean;
  isBalanceLoading: boolean;
  balance: string;
  isDisabled: boolean;
  onClick: () => void;
}

export const TransactionButton: FC<TransactionButtonProps> = ({
  isConnected,
  isBalanceLoading,
  balance,
  isDisabled,
  onClick,
}) => {
  const getButtonText = () => {
    if (!isConnected) return 'Start Exchange';
    if (isBalanceLoading) return 'Loading Balance...';
    
    // For testing purposes, if balance is 0, show a test amount
    const testBalance = parseFloat(balance) === 0 ? '1.5' : balance;
    const displayBalance = parseFloat(testBalance);
    
    if (displayBalance < 1) return 'Start Exchange';
    return `Connected (${testBalance} TON)`;
  };

  return (
    <button 
      className="btn btn-primary" 
      style={{
    width: '394px',
    height: '42px',
    padding: 0, // Optional: ensures no internal padding interferes
    fontSize: '1rem',
    lineHeight: '42px', // Optional: vertically centers text if no padding
    textAlign: 'center'
  }}
      onClick={onClick}
      disabled={isDisabled}
    >
      <span className="tm-button-label">{getButtonText()}</span>
    </button>
  );
};
