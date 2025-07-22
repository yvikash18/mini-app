export const USD_RATE = 3.367;

export const formatUSD = (ton: string): string => {
  const tonValue = parseFloat(ton);
  return isNaN(tonValue) ? '' : `$${(tonValue * USD_RATE).toFixed(2)}`;
};

export const tonToNanotons = (amount: string): string => {
  // Convert TON to nanotons (multiply by 1e9)
  console.log('tonToNanotons input:', amount);
  const tonAmount = parseFloat(amount);
  if (isNaN(tonAmount)) {
    throw new Error(`Invalid TON amount: ${amount}`);
  }
  
  // Convert to nanotons (multiply by 1e9) and ensure it's an integer
  const nanotons = Math.floor(tonAmount * 1e9);
  console.log('tonToNanotons output:', nanotons.toString());
  return nanotons.toString();
};
