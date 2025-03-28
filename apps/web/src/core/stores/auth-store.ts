import { createStore } from 'zustand/vanilla'

import { UserModel } from '../models/user.model'

export type AuthState = {
  user: UserModel | null
  loading: boolean
}

export type AuthActions = {
  signIn: (authenticatedAuth: UserModel) => void
  signOut: () => void
  startLoading: () => void
  stopLoading: () => void
}

export type AuthStore = AuthState & AuthActions

const defaultInitState: AuthState = {
  user: null,
  loading: true,
}

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    signIn: (authenticatedUser) =>
      set((state) => ({ ...state, user: authenticatedUser })),
    signOut: () => set((state) => ({ ...state, user: null })),
    startLoading: () => set((state) => ({ ...state, loading: true })),
    stopLoading: () => set((state) => ({ ...state, loading: false })),
  }))
}
