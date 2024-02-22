import { createBrowserHistory } from 'history'

import type { BrowserRouter, Route, RouteObject } from './types.js'
import { hashString } from './utils/hashString.js'

export function createRoute<const T extends string>(route: RouteObject<T>) {
  const id = route.id ? route.id : hashString(route.path)
  return { ...route, id } as Route<T>
}

export function createBrowserRouter<T extends string>(
  routes: Array<Route<T>>,
): BrowserRouter<T> {
  const history = createBrowserHistory({ window })

  return { history, routes } as BrowserRouter<T>
}
