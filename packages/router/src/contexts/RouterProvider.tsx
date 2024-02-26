import type { Location } from 'history'
import {
  Suspense,
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'

import type { BrowserRouter, NavigateFunction, RouteMatch } from '../types.js'
import { matchRoutes } from '../utils/matchRoutes.js'
import { renderMatches } from '../utils/renderMatches.js'

import { RouteDataLoaderProvider } from './RouteLoaderDataProvider.js'

export interface RouterContextValue {
  router: BrowserRouter
  matches: RouteMatch[]
  location: Location
  navigate: NavigateFunction
}

const DEFAULT_ROUTER = {} as BrowserRouter
const DEFAULT_MATCHES: RouteMatch[] = []
const DEFAULT_NAVIGATE: NavigateFunction = () => {}
const DEFAULT_LOCATION: Location = {
  hash: '',
  key: '',
  pathname: '',
  search: '',
  state: null,
}

export const RouterContext = createContext<RouterContextValue>({
  router: DEFAULT_ROUTER,
  matches: DEFAULT_MATCHES,
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

  const { matches, Route } = useMemo(() => {
    const matches = matchRoutes(router.routes, location.pathname)
    const Route = renderMatches(matches)
    return { matches, Route }
  }, [router.routes, location.pathname])

  const value = useMemo<RouterContextValue>(
    () => ({
      router,
      matches,
      location,
      navigate,
    }),
    [router, matches, location, navigate],
  )

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
