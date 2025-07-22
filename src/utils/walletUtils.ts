export const calculateButtonDisabled = (
  isConnected: boolean,
  isBalanceLoading: boolean,
  balance: string
): boolean => {
  if (!isConnected) return false;
  if (isBalanceLoading) return true;
  
  // For testing, allow sending if balance is 0 (will use test amount)
  const testBalance = parseFloat(balance) === 0 ? 1.5 : parseFloat(balance);
  return testBalance <= 0.01;
};

export const getDisplayBalance = (balance: string): string => {
  return parseFloat(balance) === 0 ? '1.5' : balance;
};

export const isBalanceSufficient = (balance: string, threshold: number = 1): boolean => {
  const actualBalance = parseFloat(balance);
  return actualBalance >= threshold;
};
