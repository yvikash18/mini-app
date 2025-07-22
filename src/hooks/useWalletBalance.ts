import { useState, useEffect } from 'react';
import { useTonWallet } from '@tonconnect/ui-react';

interface WalletBalance {
  balance: string; // Balance in TON
  balanceNano: string; // Balance in nanotons
  isLoading: boolean;
  error?: string;
}

export const useWalletBalance = () => {
  const wallet = useTonWallet();
  const [balanceInfo, setBalanceInfo] = useState<WalletBalance>({
    balance: '0',
    balanceNano: '0',
    isLoading: false,
  });

  const fetchBalance = async () => {
    if (!wallet) {
      setBalanceInfo({
        balance: '0',
        balanceNano: '0',
        isLoading: false,
      });
      return;
    }

    setBalanceInfo(prev => ({ ...prev, isLoading: true, error: undefined }));
    console.log('Fetching balance for address:', wallet.account.address);

    try {
      // Use TON API to fetch balance
      const response = await fetch(
        `https://toncenter.com/api/v2/getAddressBalance?address=${wallet.account.address}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Balance API response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Balance API response data:', data);
      
      if (data.ok) {
        const balanceNano = data.result || '0';
        const balanceTon = (parseInt(balanceNano) / 1e9).toFixed(6);
        
        console.log('Parsed balance:', balanceTon, 'TON');
        
        setBalanceInfo({
          balance: balanceTon,
          balanceNano: balanceNano,
          isLoading: false,
        });
      } else {
        throw new Error(data.error || 'Failed to fetch balance');
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalanceInfo({
        balance: '0',
        balanceNano: '0',
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  useEffect(() => {
    if (wallet) {
      fetchBalance();
    }
  }, [wallet?.account.address]);

  return {
    ...balanceInfo,
    refetch: fetchBalance,
  };
};
