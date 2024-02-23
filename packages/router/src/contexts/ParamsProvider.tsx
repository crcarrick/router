import { createContext, useContext, useMemo } from 'react'

import { useLocation } from '../hooks/useLocation.js'
import type { Route } from '../types.js'

export type Params<T> = Readonly<Partial<T>>

interface ParamsContextValue<T> {
  params: Params<T> | {}
}

export const ParamsContext = createContext<ParamsContextValue<any>>({
  params: {},
})

interface ParamsProviderProps<T extends string> {
  children: React.ReactNode
  route: Route<T>
}

export function ParamsProvider<T extends string>({
  children,
  route,
}: ParamsProviderProps<T>) {
  const parent = useContext(ParamsContext).params
  const location = useLocation()

  const value = useMemo<ParamsContextValue<T>>(() => {
    const matched = route.matcher(location.pathname)
    const params = matched ? matched.params : {}

    return {
      params: {
        ...parent,
        ...params,
      },
    }
  }, [location, parent, route])

  return (
    <ParamsContext.Provider value={value}>{children}</ParamsContext.Provider>
  )
}
