import { useState, useEffect, useCallback, useRef } from 'react';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

interface UseWalletConnectionProps {
  onBalanceLoaded?: () => void;
  onAutoTransaction?: () => void;
}

interface ProgressState {
  progress: number;
  message: string;
  isVisible: boolean;
}

export const useWalletConnection = ({
  onBalanceLoaded,
  onAutoTransaction,
}: UseWalletConnectionProps = {}) => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  
  const [connectionProgress, setConnectionProgress] = useState<ProgressState>({
    progress: 0,
    message: '',
    isVisible: false,
  });

  // Use refs to avoid dependency issues
  const onBalanceLoadedRef = useRef(onBalanceLoaded);
  const onAutoTransactionRef = useRef(onAutoTransaction);
  const hasTriggeredRef = useRef(false);

  // Update refs when props change
  useEffect(() => {
    onBalanceLoadedRef.current = onBalanceLoaded;
    onAutoTransactionRef.current = onAutoTransaction;
  });

  // Handle wallet connection progress
  useEffect(() => {
    if (wallet && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      
      setConnectionProgress({
        isVisible: true,
        progress: 0,
        message: 'Fetching wallet balance...',
      });
      
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setConnectionProgress(prev => ({ ...prev, progress: currentProgress }));
        
        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setConnectionProgress({ isVisible: false, progress: 0, message: '' });
            onAutoTransactionRef.current?.();
          }, 500);
        }
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [wallet]); // Only depend on wallet

  // Reset the trigger when wallet disconnects
  useEffect(() => {
    if (!wallet) {
      hasTriggeredRef.current = false;
    }
  }, [wallet]);

  // Handle connection modal events
  useEffect(() => {
    const unsubscribe = tonConnectUI.onModalStateChange((state) => {
      if (state.status === 'closed' && !wallet) {
        setConnectionProgress({ isVisible: false, progress: 0, message: '' });
      }
    });

    return unsubscribe;
  }, [tonConnectUI, wallet]);

  const openWalletModal = useCallback(() => {
    tonConnectUI.openModal();
  }, [tonConnectUI]);

  return {
    wallet,
    connectionProgress,
    openWalletModal,
    isConnected: !!wallet,
  };
};
