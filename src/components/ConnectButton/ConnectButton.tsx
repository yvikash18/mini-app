import { FC, useCallback } from 'react';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import { useAutoTransaction } from '@/hooks/useAutoTransaction';
import { useWalletConnection } from '@/hooks/useWalletConnection';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { TransactionButton } from '@/components/TransactionButton/TransactionButton';
import { calculateButtonDisabled } from '@/utils/walletUtils';

interface ConnectButtonProps {
  dealPrice?: string;
  onTransactionStart?: () => void;
  onTransactionComplete?: () => void;
  onTransactionError?: (error: Error) => void;
}

export const ConnectButton: FC<ConnectButtonProps> = ({
  dealPrice: _dealPrice,
  onTransactionStart,
  onTransactionComplete,
  onTransactionError,
}) => {
  const { balance, isLoading: balanceLoading, refetch } = useWalletBalance();
  
  const {
    progressState,
    errorState,
    executeTransaction,
    handleAutoTransaction,
    hideError,
  } = useAutoTransaction({
    balance,
    onTransactionStart,
    onTransactionComplete,
    onTransactionError,
    refetchBalance: refetch,
  });

  // Stable callback references
  const onBalanceLoaded = useCallback(() => !balanceLoading, [balanceLoading]);
  const onAutoTransaction = useCallback(() => {
    handleAutoTransaction();
  }, [handleAutoTransaction]);

  const { 
    wallet, 
    connectionProgress, 
    openWalletModal, 
    isConnected 
  } = useWalletConnection({
    onBalanceLoaded,
    onAutoTransaction,
  });

  const handleClick = useCallback(async () => {
    console.log('Button clicked, wallet:', !!wallet, 'balance:', balance);
    
    if (!isConnected) {
      openWalletModal();
    } else {
      await executeTransaction();
    }
  }, [isConnected, openWalletModal, executeTransaction, wallet, balance]);

  const isButtonDisabled = calculateButtonDisabled(isConnected, balanceLoading, balance);

  return (
    <>
      {/* Connection Progress */}
      <ProgressBar 
        progress={connectionProgress.progress}
        message={connectionProgress.message}
        isVisible={connectionProgress.isVisible}
        type="loading"
      />

      {/* Transaction Progress */}
      <ProgressBar 
        progress={progressState.progress}
        message={progressState.message}
        detail={progressState.detail}
        isVisible={progressState.isVisible}
        type="loading"
      />
      
      {/* Error Modal */}
      <ProgressBar 
        progress={0}
        message={errorState.message}
        isVisible={errorState.isVisible}
        type="error"
        onClose={hideError}
      />
      
      <div className="tm-section-box tm-section-buttons">
        <TransactionButton 
          isConnected={isConnected}
          isBalanceLoading={balanceLoading}
          balance={balance}
          isDisabled={isButtonDisabled}
          onClick={handleClick}
        />
        
      
      </div>
    </>
  );
};
