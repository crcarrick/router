import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'

import { useParams } from '../hooks/useParams.js'
import type { PathParams, Route } from '../types.js'

import { RouteDataLoaderContext } from './RouteLoaderDataProvider.js'

export interface LoaderDataContextValue {
  loaderData: unknown
}

export const LoaderDataContext = createContext<LoaderDataContextValue>({
  loaderData: undefined,
})

export interface LoaderDataProviderProps<T extends string> {
  children: React.ReactNode
  route: Route<T>
}

export function LoaderDataProvider<T extends string>({
  children,
  route,
}: LoaderDataProviderProps<T>) {
  const { addLoaderEntry } = useContext(RouteDataLoaderContext)
  const params = useParams<PathParams<T>>()

  const [error, setError] = useState<unknown>()
  const [loaderData, setLoaderData] =
    useState<LoaderDataContextValue['loaderData']>(undefined)

  useLayoutEffect(() => {
    if (route.loader) {
      Promise.resolve(route.loader(params)).then(
        (data) => {
          addLoaderEntry(route, data)
          setLoaderData(data)
        },
        (error) => {
          setError(error)
        },
      )
    }
  }, [params, route, addLoaderEntry])

  const value = useMemo<LoaderDataContextValue>(
    () => ({ loaderData }),
    [loaderData],
  )

  if (error) {
    throw error
  }

  return (
    <LoaderDataContext.Provider value={value}>
      {children}
    </LoaderDataContext.Provider>
  )
}

LoaderDataProvider.displayName = 'LoaderData.Provider'
