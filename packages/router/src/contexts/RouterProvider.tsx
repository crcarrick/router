import type { Location } from 'history'
import {
  Suspense,
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'

import type { BrowserRouter } from '../types.js'
import { matchRoutes } from '../utils/matchRoutes.js'
import { renderMatches } from '../utils/renderMatches.js'

import { RouteDataLoaderProvider } from './RouteLoaderDataProvider.js'

export interface NavigateOptions {
  replace?: boolean
  state?: any
}

export interface NavigateFunction {
  (to: string, options?: NavigateOptions): void
}

export interface RouterContextValue {
  navigate: NavigateFunction
  // state: {
  // matches: Match<any>[]
  location: Location
  // }
}

const DEFAULT_NAVIGATE: NavigateFunction = () => {}
const DEFAULT_LOCATION: Location = {
  hash: '',
  key: '',
  pathname: '',
  search: '',
  state: null,
}

export const RouterContext = createContext<RouterContextValue>({
  location: DEFAULT_LOCATION,
  navigate: DEFAULT_NAVIGATE,
})

interface RouterProviderProps {
  router: BrowserRouter
  fallbackElement?: React.ReactNode
}

export function RouterProvider({
  router,
  fallbackElement,
}: RouterProviderProps) {
  const [location, setLocation] = useState<Location>(
    window.location as unknown as Location,
  )
  const navigate = useCallback<NavigateFunction>(
    (to, options = {}) =>
      options.replace
        ? router.history.replace(to, options.state)
        : router.history.push(to, options.state),
    [router.history],
  )

  useLayoutEffect(
    () => router.history.listen(({ location }) => setLocation(location)),
    [router.history],
  )

  const value = useMemo<RouterContextValue>(
    () => ({
      location,
      navigate,
    }),
    [location, navigate],
  )

  const { Route } = useMemo(() => {
    const route = matchRoutes(router.routes, location.pathname)
    const Route = route ? renderMatches(route) : null
    return { route, Route }
  }, [router.routes, location.pathname])

  return Route ? (
    <Suspense fallback={fallbackElement ?? <div>Loading...</div>}>
      <RouterContext.Provider value={value}>
        <RouteDataLoaderProvider>{Route}</RouteDataLoaderProvider>
      </RouterContext.Provider>
    </Suspense>
  ) : (
    <div>Not found</div>
  )
}

RouterProvider.displayName = 'Router.Provider'
