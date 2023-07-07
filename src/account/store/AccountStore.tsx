import { create } from 'zustand'
import { Account } from '../entity/Account'

interface AccountState {
  account: Account | null
  setAccount: (account: Account | null) => void
}

export const useAccountStore = create<AccountState>((set) => ({
  account: null,
  setAccount: (account) => set({ account }),
}))

export default useAccountStore
