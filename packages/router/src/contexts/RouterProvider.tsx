import type { Location } from 'history'
import { match } from 'path-to-regexp'
import {
  Suspense,
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'

import type { BrowserRouter, PathParams } from '../types.js'

export type Params<T> = Readonly<Partial<T>>

interface NavigateOptions {
  replace?: boolean
  state?: any
}

export interface NavigateFunction {
  (to: string, options?: NavigateOptions): void
}

interface RouterContextValue {
  params: Params<any>
  location: Location
  navigate: NavigateFunction
}

const DEFAULT_PARAMS: Params<any> = {}
const DEFAULT_NAVIGATE: NavigateFunction = () => {}
const DEFAULT_LOCATION: Location = {
  hash: '',
  key: '',
  pathname: '',
  search: '',
  state: null,
}

export const RouterContext = createContext<RouterContextValue>({
  params: DEFAULT_PARAMS,
  location: DEFAULT_LOCATION,
  navigate: DEFAULT_NAVIGATE,
})

interface RouterProviderProps<T extends string> {
  router: BrowserRouter<T>
}

function findRoute<T extends string>(
  router: BrowserRouter<T>,
  location: Location,
) {
  for (const route of router.routes) {
    const matcher = match(route.path)
    const matched = matcher(location.pathname)

    if (matched) {
      const Component = route.component

      interface RouteComponentProps {
        component: typeof Component
        params: PathParams<typeof route.path>
        loader?: typeof route.loader
      }

      const RouteComponent = ({
        component: Component,
        loader,
        params,
      }: RouteComponentProps) => {
        const [loaderData, setLoaderData] = useState({})

        useLayoutEffect(() => {
          Promise.resolve(loader?.(params))
            .then((value) => {
              setLoaderData(value as {})
            })
            .catch(() => {})
        }, [loader, params])

        return <Component params={params} data={loaderData} />
      }

      return (
        <RouteComponent
          component={Component}
          loader={route.loader}
          params={matched.params as PathParams<typeof route.path>}
        />
      )
    }
  }
}

export function RouterProvider<T extends string>({
  router,
}: RouterProviderProps<T>) {
  const [params, _setParams] = useState<Params<any>>(DEFAULT_PARAMS)
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
      params,
      location,
      navigate,
    }),
    [params, location, navigate],
  )

  const route = useMemo(() => findRoute(router, location), [router, location])

  return route ? (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterContext.Provider value={value}>{route}</RouterContext.Provider>
    </Suspense>
  ) : (
    <div>Not found</div>
  )
}
