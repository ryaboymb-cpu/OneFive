import { mnemonicNew, mnemonicToWalletKey } from '@ton/crypto'
import { WalletContractV4, TonClient, internal } from '@ton/ton'
import { Address, toNano } from '@ton/core'
import { TON_CONFIG } from '../constants/config'

const client = new TonClient({ endpoint: TON_CONFIG.endpoint })

export async function generateWallet(): Promise<{ mnemonic: string[]; address: string; publicKey: string }> {
  const mnemonic = await mnemonicNew(12) // 12 слов для UX
  const keyPair = await mnemonicToWalletKey(mnemonic)
  const wallet = WalletContractV4.create({ publicKey: keyPair.publicKey, workchain: 0 })
  
  return {
    mnemonic,
    address: wallet.address.toString({ testOnly: TON_CONFIG.network === 'testnet' }),
    publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
  }
}

export async function importWalletFromMnemonic(mnemonic: string[]) {
  const keyPair = await mnemonicToWalletKey(mnemonic as any)
  const wallet = WalletContractV4.create({ publicKey: keyPair.publicKey, workchain: 0 })
  return {
    address: wallet.address.toString({ testOnly: TON_CONFIG.network === 'testnet' }),
    publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
  }
}

export async function fetchBalance(address: string) {
  try {
    const bal = await client.getBalance(Address.parse(address))
    return (Number(bal) / 1e9).toFixed(4)
  } catch { return '0.0000' }
}

export async function sendTon(mnemonic: string[], to: string, amount: string) {
  const keyPair = await mnemonicToWalletKey(mnemonic as any)
  const wallet = WalletContractV4.create({ publicKey: keyPair.publicKey, workchain: 0 })
  const contract = client.open(wallet)
  const seqno = await contract.getSeqno()
  
  await contract.sendTransfer({
    secretKey: keyPair.secretKey,
    seqno,
    messages: [internal({ to: Address.parse(to), value: toNano(amount), bounceable: false })]
  })
  return seqno
                                          }
