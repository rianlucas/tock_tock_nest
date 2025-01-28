export type Asset = {
  id: string
  name: string
  ticket: string
  price: number
  createdAt: Date
  updatedAt: Date
  wallet: Wallet[]
  Transaction: Transaction[]
  WalletAssetSummaries: WalletAssetSummaries[]
}

export type Wallet = {
  id: string
  name: string
  totalInvested: number
  grossBalance: number
  createdAt: Date
  updatedAt: Date
  userId: string
  user?: User
  Asset?: Asset[]
  Transaction?: Transaction[]
  WalletAssetSummaries?: WalletAssetSummaries[]
}

export type User = {
  id: string
  email: string
  name: string
  lastName: string
  document: string
  password: string
  createdAt: Date
  updatedAt: Date
  Wallet?: Wallet[]
}

export type Transaction = {
  id: string
  type: string
  amount: number
  quantity: number
  createdAt?: Date
  updatedAt?: Date
  walletId: string
  wallet?: Wallet
  assetId: string
  asset?: Asset
}

export type CreateTransactionSchema = {
  type: string
  amount: number
  quantity: number
  walletId: number
  assetId: number
}

export type WalletAssetSummaries = {
  id: string
  walletId: string
  wallet?: Wallet
  assetId: string
  asset?: Asset
  averagePrice: number
  assetCount: number
  totalInvested: number
  grossBalance: number
  createdAt: Date
  updatedAt: Date
}