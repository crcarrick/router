import React, { createContext, useMemo } from 'react'

import type { Resource } from '../utils/defer.js'

interface AwaitContextValue<T> {
  value: T
}

export const AwaitContext = createContext<AwaitContextValue<unknown>>({
  value: undefined,
})

interface AwaitProviderProps<T> {
  children: React.ReactNode
  resolve: Resource<T>
}

export function AwaitProvider<T>({ children, resolve }: AwaitProviderProps<T>) {
  const result = resolve.read()
  const value = useMemo(() => ({ value: result }), [result])

  return <AwaitContext.Provider value={value}>{children}</AwaitContext.Provider>
}

AwaitProvider.displayName = 'Await.Provider'
