import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'

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
  params: PathParams<T>
  route: Route<T>
}

export function LoaderDataProvider<T extends string>({
  children,
  params,
  route,
}: LoaderDataProviderProps<T>) {
  const { addLoaderEntry } = useContext(RouteDataLoaderContext)

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
