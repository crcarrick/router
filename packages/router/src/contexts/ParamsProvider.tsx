import { createContext, useContext, useMemo } from 'react'

import { useLocation } from '../hooks/useLocation.js'
import type { Params, Route } from '../types.js'

export interface ParamsContextValue {
  params: Params<any> | {}
}

export const ParamsContext = createContext<ParamsContextValue>({
  params: {},
})

export interface ParamsProviderProps {
  children: React.ReactNode
  route: Route
}

export function ParamsProvider({ children, route }: ParamsProviderProps) {
  const parent = useContext(ParamsContext).params
  const location = useLocation()

  const value = useMemo<ParamsContextValue>(() => {
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

ParamsProvider.displayName = 'Params.Provider'
