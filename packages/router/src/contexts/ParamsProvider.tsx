import { createContext, useContext, useMemo } from 'react'

import type { Params } from '../types.js'

export interface ParamsContextValue {
  params: Params<any> | {}
}

export const ParamsContext = createContext<ParamsContextValue>({
  params: {},
})

export interface ParamsProviderProps {
  children: React.ReactNode
  params: Params<any>
}

export function ParamsProvider({ children, params }: ParamsProviderProps) {
  const parent = useContext(ParamsContext).params

  const value = useMemo<ParamsContextValue>(() => {
    return {
      params: {
        ...parent,
        ...params,
      },
    }
  }, [parent, params])

  return (
    <ParamsContext.Provider value={value}>{children}</ParamsContext.Provider>
  )
}

ParamsProvider.displayName = 'Params.Provider'
