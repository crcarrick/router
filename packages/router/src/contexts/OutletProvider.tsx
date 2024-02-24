import { createContext, useMemo } from 'react'

import type { RouteMatch } from '../types.js'

export interface OutletContextValue {
  matches: RouteMatch[] | undefined
}

export const OutletContext = createContext<OutletContextValue>({
  matches: undefined,
})

export interface OutletProviderProps {
  children: React.ReactNode
  matches: RouteMatch[]
}

export function OutletProvider({ children, matches }: OutletProviderProps) {
  const value = useMemo<OutletContextValue>(() => ({ matches }), [matches])

  return (
    <OutletContext.Provider value={value}>{children}</OutletContext.Provider>
  )
}

OutletProvider.displayName = 'Outlet.Provider'
