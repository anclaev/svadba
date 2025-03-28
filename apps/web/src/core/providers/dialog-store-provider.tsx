'use client'

import { createContext, useContext, useRef, type ReactNode } from 'react'
import { useStore } from 'zustand'

import { createDialogStore, type DialogStore } from '@/core/stores/dialog-store'

export type DialogStoreApi = ReturnType<typeof createDialogStore>

export const DialogStoreContext = createContext<DialogStoreApi | undefined>(
  undefined
)

export interface DialogStoreProviderProps {
  children: ReactNode
}

export const DialogStoreProvider = ({ children }: DialogStoreProviderProps) => {
  const storeRef = useRef<DialogStoreApi | null>(null)

  if (storeRef.current === null) {
    storeRef.current = createDialogStore()
  }

  return (
    <DialogStoreContext.Provider value={storeRef.current}>
      {children}
    </DialogStoreContext.Provider>
  )
}

export const useDialogStore = <T,>(selector: (store: DialogStore) => T): T => {
  const dialogStoreContext = useContext(DialogStoreContext)
  if (!dialogStoreContext) {
    throw new Error(
      'Хук useDialogStore может быть использован только в контексте DialogStore'
    )
  }

  return useStore(dialogStoreContext, selector)
}
