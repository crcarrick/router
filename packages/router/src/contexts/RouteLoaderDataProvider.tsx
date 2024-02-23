import { createContext, useCallback, useMemo, useState } from 'react'

import { Route } from '../types.js'

interface RouteDataLoaderContextValue {
  entries: Map<string, unknown>
  addLoaderEntry: <T extends string>(
    route: Route<T>,
    loaderData: unknown,
  ) => void
}

export const RouteDataLoaderContext =
  createContext<RouteDataLoaderContextValue>({
    entries: new Map(),
    addLoaderEntry: () => {},
  })

interface RouteDataLoaderProviderProps {
  children: React.ReactNode
}

export function RouteDataLoaderProvider({
  children,
}: RouteDataLoaderProviderProps) {
  const [entries, setEntries] = useState<
    RouteDataLoaderContextValue['entries']
  >(new Map())

  const addLoaderEntry = useCallback(
    <T extends string>(route: Route<T>, loaderData: unknown) => {
      setEntries((prevEntries) => {
        const nextEntries = new Map(prevEntries)
        nextEntries.set(route.id, loaderData)
        return nextEntries
      })
    },
    [],
  )

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
