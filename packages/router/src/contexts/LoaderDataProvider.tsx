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

interface LoaderDataContextValue {
  loaderData: unknown
}

export const LoaderDataContext = createContext<LoaderDataContextValue>({
  loaderData: undefined,
})

interface LoaderDataProviderProps<T extends string> {
  children: React.ReactNode
  route: Route<T>
}

export function LoaderDataProvider<T extends string>({
  children,
  route,
}: LoaderDataProviderProps<T>) {
  const { addLoaderEntry } = useContext(RouteDataLoaderContext)
  const params = useParams()

  const [loaderData, setLoaderData] =
    useState<LoaderDataContextValue['loaderData']>(undefined)

  useLayoutEffect(() => {
    if (route.loader) {
      Promise.resolve(route.loader(params as PathParams<T>)).then(
        (data) => {
          addLoaderEntry(route, data)
          setLoaderData(data)
        },
        (error) => {
          throw error
        },
      )
    }
  }, [params, route, addLoaderEntry])

  const value = useMemo<LoaderDataContextValue>(
    () => ({ loaderData }),
    [loaderData],
  )

  return (
    <LoaderDataContext.Provider value={value}>
      {children}
    </LoaderDataContext.Provider>
  )
}
