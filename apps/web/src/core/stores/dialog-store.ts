import { createStore } from 'zustand/vanilla'

export type DialogState = {
  isLoginOpen: boolean
}

export type DialogActions = {
  openLogin: () => void
  closeLogin: () => void
}

export type DialogStore = DialogState & DialogActions

export const defaultInitState: DialogState = {
  isLoginOpen: false,
}

export const createDialogStore = (
  initState: DialogState = defaultInitState
) => {
  return createStore<DialogStore>()((set) => ({
    ...initState,
    openLogin: () => set(() => ({ isLoginOpen: true })),
    closeLogin: () => set(() => ({ isLoginOpen: false })),
  }))
}
