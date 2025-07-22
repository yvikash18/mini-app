import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { tonToNanotons } from '@/utils/currency';
import type { TransactionParams } from '@/types/deal';

export const useTonTransaction = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const sendTransaction = async (params: TransactionParams) => {
    if (!wallet) {
      throw new Error('Wallet not connected');
    }
    
    return await tonConnectUI.sendTransaction(params);
  };

  const createDealTransaction = (dealPrice: string, receiverAddress: string) => {
    return {
      validUntil: Math.floor(Date.now() / 1000) + 600, // 10 minutes
      messages: [
        {
          address: receiverAddress,
          amount: tonToNanotons(dealPrice),
        },
      ],
    };
  };

  return {
    sendTransaction,
    createDealTransaction,
    isWalletConnected: !!wallet,
  };
};
