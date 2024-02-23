import { createContext, useMemo, useState } from 'react'

interface ErrorContextValue {
  asyncError: unknown
  routeError: unknown
  setAsyncError: React.Dispatch<React.SetStateAction<unknown>>
  setRouteError: React.Dispatch<React.SetStateAction<unknown>>
}

export const ErrorContext = createContext<ErrorContextValue>({
  asyncError: undefined,
  routeError: undefined,
  setAsyncError: () => {},
  setRouteError: () => {},
})

interface ErrorProviderProps {
  children: React.ReactNode
}

export function ErrorProvider({ children }: ErrorProviderProps) {
  const [asyncError, setAsyncError] = useState<unknown>(undefined)
  const [routeError, setRouteError] = useState<unknown>(undefined)

  const value = useMemo(
    () => ({ asyncError, setAsyncError, routeError, setRouteError }),
    [asyncError, routeError],
  )

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}
