import { createContext, useCallback, useMemo, useState } from 'react'

import { Route } from '../types.js'

export interface RouteDataLoaderContextValue {
  entries: Map<string, unknown>
  addLoaderEntry: (route: Route, loaderData: unknown) => void
}

export const RouteDataLoaderContext =
  createContext<RouteDataLoaderContextValue>({
    entries: new Map(),
    addLoaderEntry: () => {},
  })

export interface RouteDataLoaderProviderProps {
  children: React.ReactNode
}

export function RouteDataLoaderProvider({
  children,
}: RouteDataLoaderProviderProps) {
  const [entries, setEntries] = useState<
    RouteDataLoaderContextValue['entries']
  >(new Map())

  const addLoaderEntry = useCallback((route: Route, loaderData: unknown) => {
    setEntries((prevEntries) => {
      const nextEntries = new Map(prevEntries)
      nextEntries.set(route.id, loaderData)
      return nextEntries
    })
  }, [])

  const value = useMemo(
    () => ({ entries, addLoaderEntry }),
    [entries, addLoaderEntry],
  )

  return (
    <RouteDataLoaderContext.Provider value={value}>
      {children}
    </RouteDataLoaderContext.Provider>
  )
}

RouteDataLoaderProvider.displayName = 'RouteDataLoader.Provider'
