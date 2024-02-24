import { createBrowserHistory } from 'history'

import type { BrowserRouter, Route, RouteObject } from './types.js'
import { hashString } from './utils/hashString.js'
import { join } from './utils/join.js'

export function createRoute(route: RouteObject, previous = ''): Route {
  const id = route.id ? route.id : hashString(route.path)
  const full = join(previous, route.path)

  return (
    route.children
      ? {
          ...route,
          id,
          full,
          children: route.children.map((child) => createRoute(child, full)),
        }
      : { ...route, id, full }
  ) as Route
}

export function createBrowserRouter(routes: Array<RouteObject>) {
  const history = createBrowserHistory({ window })
  return {
    history,
    routes: routes.map((route) => createRoute(route)),
  } as BrowserRouter
}
