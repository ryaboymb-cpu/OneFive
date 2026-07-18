import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { get, set } from 'idb-keyval'
import { WalletData, WalletState } from '../types'

interface Store extends WalletState {
  setWallet: (w: WalletData | null) => void
  setBalance: (b: string) => void
  setLocked: (l: boolean) => void
  toggleHidden: () => void
  logout: () => void
}

export const useWalletStore = create<Store>()(
  persist(
    (set, get) => ({
      wallet: null,
      isLocked: true,
      balance: '0.0000',
      hidden: false,
      clubActive: false,
      setWallet: (wallet) => set({ wallet, isLocked: !wallet }),
      setBalance: (balance) => set({ balance }),
      setLocked: (isLocked) => set({ isLocked }),
      toggleHidden: () => set((s) => ({ hidden: !s.hidden })),
      logout: () => set({ wallet: null, isLocked: true, balance: '0.0000' }),
    }),
    {
      name: 'of-storage',
      storage: {
        getItem: async (name) => { const v = await get(name); return v || null },
        setItem: async (name, value) => await set(name, value),
        removeItem: async (name) => await set(name, undefined),
      },
    }
  )
)
