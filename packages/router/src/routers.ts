import { createBrowserHistory } from 'history'

import type { BrowserRouter, Route, RouteObject } from './types.js'

export function createRoute<const T extends string>(route: RouteObject<T>) {
  return route as Route<any>
}

export function createBrowserRouter<T extends string>(
  routes: Array<Route<T>>,
): BrowserRouter<T> {
  const history = createBrowserHistory({ window })

  return { history, routes } as BrowserRouter<T>
}
