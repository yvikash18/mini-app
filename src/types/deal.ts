export interface DealParams {
  username: string;
  dealPrice: string;
  commission: string;
  telegramId: string;
}

export interface TransactionMessage {
  address: string;
  amount: string;
}

export interface TransactionParams {
  validUntil: number;
  messages: TransactionMessage[];
}
