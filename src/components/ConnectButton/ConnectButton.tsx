import { FC } from 'react';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useTonTransaction } from '@/hooks/useTonTransaction';
import { RECEIVER_ADDRESS } from '@/constants';

interface ConnectButtonProps {
  dealPrice?: string;
  onTransactionStart?: () => void;
  onTransactionComplete?: () => void;
  onTransactionError?: (error: Error) => void;
}

export const ConnectButton: FC<ConnectButtonProps> = ({
  dealPrice,
  onTransactionStart,
  onTransactionComplete,
  onTransactionError,
}) => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const { sendTransaction, createDealTransaction } = useTonTransaction();

  const handleClick = async () => {
    if (!wallet) {
      // Open wallet connection modal
      tonConnectUI.openModal();
    } else if (dealPrice) {
      // If wallet is connected and dealPrice is provided, initiate transaction
      try {
        onTransactionStart?.();
        const transaction = createDealTransaction(
          dealPrice,
          RECEIVER_ADDRESS // Replace with actual receiver address
        );
        await sendTransaction(transaction);
        onTransactionComplete?.();
      } catch (error) {
        console.error('Transaction failed:', error);
        onTransactionError?.(error as Error);
      }
    }
  };

  const getButtonText = () => {
    if (!wallet) return 'Connect Wallet';
    if (dealPrice) return `Send ${dealPrice} TON`;
    return 'Wallet Connected';
  };

  return (
    <div className="tm-section-box tm-section-buttons">
      <button 
        className="btn btn-primary" 
        onClick={handleClick}
        disabled={!!wallet && !dealPrice}
      >
        <span className="tm-button-label">{getButtonText()}</span>
      </button>
      {wallet && (
        <div className="wallet-info" style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#666' }}>
          Connected: {wallet.account.address.slice(0, 6)}...{wallet.account.address.slice(-6)}
        </div>
      )}
    </div>
  );
};
