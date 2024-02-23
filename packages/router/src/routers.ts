import { createBrowserHistory } from 'history'
import { match } from 'path-to-regexp'

import type { BrowserRouter, Route, RouteObject } from './types.js'
import { hashString } from './utils/hashString.js'
import { join } from './utils/join.js'

export function createRoute<const T extends string>(
  route: RouteObject<T>,
  previous = '',
): Route<T> {
  const id = route.id ? route.id : hashString(route.path)
  const full = join(previous, route.path)
  const matcher = match(full)

  return (
    route.children
      ? {
          ...route,
          id,
          full,
          matcher,
          children: route.children.map((child) => createRoute(child, full)),
        }
      : { ...route, id, full, matcher }
  ) as Route<T>
}

export function createBrowserRouter<T extends string>(
  routes: Array<RouteObject<T>>,
) {
  const history = createBrowserHistory({ window })
  return {
    history,
    routes: routes.map((route) => createRoute(route)),
  } as BrowserRouter<T>
}
