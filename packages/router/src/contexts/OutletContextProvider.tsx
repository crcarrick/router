import { createContext, useMemo } from 'react'

export interface OutletContextContextValue {
  context: unknown
}

export const OutletContextContext = createContext<OutletContextContextValue>({
  context: undefined,
})

export interface OutletContextProviderProps {
  children: React.ReactNode
  context: unknown
}

export function OutletContextProvider({
  children,
  context,
}: OutletContextProviderProps) {
  const value = useMemo<OutletContextContextValue>(
    () => ({ context }),
    [context],
  )

  return (
    <OutletContextContext.Provider value={value}>
      {children}
    </OutletContextContext.Provider>
  )
}

OutletContextProvider.displayName = 'OutletContext.Provider'
