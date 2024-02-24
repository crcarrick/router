import { createContext, useMemo } from 'react'

import type { Route } from '../types.js'

export interface OutletContextValue {
  route: Route<any> | undefined
}

export const OutletContext = createContext<OutletContextValue>({
  route: undefined,
})

export interface OutletProviderProps<T extends string> {
  children: React.ReactNode
  route: Route<T>
}

export function OutletProvider<T extends string>({
  children,
  route,
}: OutletProviderProps<T>) {
  const value = useMemo<OutletContextValue>(
    () => ({ route: route.children?.[0] }),
    [route],
  )

  return (
    <OutletContext.Provider value={value}>{children}</OutletContext.Provider>
  )
}

OutletProvider.displayName = 'Outlet.Provider'
