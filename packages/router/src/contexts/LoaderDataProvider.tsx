import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'

import { useNavigate } from '../hooks/useNavigate.js'
import { useParams } from '../hooks/useParams.js'
import type { Route } from '../types.js'

import { RouteDataLoaderContext } from './RouteLoaderDataProvider.js'

export interface LoaderDataContextValue {
  loaderData: unknown
}

export const LoaderDataContext = createContext<LoaderDataContextValue>({
  loaderData: undefined,
})

export interface LoaderDataProviderProps {
  children: React.ReactNode
  route: Route
}

export function LoaderDataProvider({
  children,
  route,
}: LoaderDataProviderProps) {
  const { addLoaderEntry } = useContext(RouteDataLoaderContext)
  const navigate = useNavigate()
  const params = useParams()

  const [error, setError] = useState<unknown>()
  const [loaderData, setLoaderData] =
    useState<LoaderDataContextValue['loaderData']>(undefined)

  useLayoutEffect(() => {
    if (route.loader) {
      Promise.resolve(route.loader(params))
        .then((data) => {
          if (data instanceof Response) {
            switch (data.status) {
              case 200: {
                for (const [name, value] of data.headers.entries()) {
                  if (
                    name.toLowerCase() === 'content-type' &&
                    value.startsWith('application/json')
                  ) {
                    return data.json()
                  }
                }
                break
              }

              case 302: {
                const doc = data.headers.get('X-Redirect-Document')
                const url = data.headers.get('Location')
                if (url) {
                  if (doc) {
                    // TODO: handle relative URLs
                    window.location.pathname = url
                  } else {
                    navigate(url, { replace: true })
                  }
                }
              }
            }
          }
          return data
        })
        .then((data) => {
          if (data) {
            setLoaderData(data)
            addLoaderEntry(route, data)
          }
        })
        .catch((error) => {
          setError(error)
        })
    }
  }, [params, route, navigate, addLoaderEntry])

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
