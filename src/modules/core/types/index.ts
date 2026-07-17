export interface WalletData {
  address: string
  publicKey: string
  mnemonicEncrypted: string // base64 payload
}

export interface WalletState {
  wallet: WalletData | null
  isLocked: boolean
  balance: string
  hidden: boolean
  clubActive: boolean
}
