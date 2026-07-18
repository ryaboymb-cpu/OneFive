// TESTNET CONFIG (поменяй на mainnet для продакшена)
export const TON_CONFIG = {
  endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
  network: 'testnet' as const,
}

// Treasury кошелек для сбора комиссий и оплаты Club
export const TREASURY_ADDRESS = 'EQ...' // Замени на свой адрес

export const FEES = {
  swapPercent: 0.5,        // 0.5%
  p2pSellerPercent: 0.5,   // 0.5%
  p2pDisputePercent: 1.0,  // 1%
  clubPriceUsd: 25,        // $25/мес
}
