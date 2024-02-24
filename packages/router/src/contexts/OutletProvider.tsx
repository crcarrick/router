import { createContext, useMemo } from 'react'

import type { Route } from '../types.js'

export interface OutletContextValue {
  route: Route | undefined
}

export const OutletContext = createContext<OutletContextValue>({
  route: undefined,
})

export interface OutletProviderProps {
  children: React.ReactNode
  route: Route
}

export function OutletProvider({ children, route }: OutletProviderProps) {
  const value = useMemo<OutletContextValue>(
    () => ({ route: route.children?.[0] }),
    [route],
  )

  return (
    <OutletContext.Provider value={value}>{children}</OutletContext.Provider>
  )
}

OutletProvider.displayName = 'Outlet.Provider'
