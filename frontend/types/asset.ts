export interface Asset {
  id?: string;
  ticket: string;
  name?: string;
  price: number;
  createdAt: Date;
  updatedAt?: Date;
  wallet?: any;  // ou defina o tipo correto do wallet
  quantity?: number;
}

export interface CreateTransactionSchema {
  type: 'buy' | 'sell';
  quantity: number;
  amount: number;
  assetId: number;
  walletId: number;
}

export interface Transaction extends CreateTransactionSchema {
  id?: string;
  createdAt?: Date;
} 