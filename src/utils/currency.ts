export const USD_RATE = 3.367;

export const formatUSD = (ton: string): string => {
  const tonValue = parseFloat(ton);
  return isNaN(tonValue) ? '' : `$${(tonValue * USD_RATE).toFixed(2)}`;
};

export const tonToNanotons = (amount: string): string => {
  return (BigInt(amount) * BigInt(1e9)).toString();
};
