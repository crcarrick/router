import type { Route, RouteMatch } from '../types.js'

import { matchPath } from './matchPath.js'

export function matchRoutes(routes: Route[], pathname: string): RouteMatch[] {
  for (const route of routes) {
    const pathMatch = matchPath(route.full, pathname)
    if (pathMatch !== null) {
      const match = {
        params: pathMatch.params,
        pathname: pathMatch.pathname,
        route,
      }
      return [match]
    }
    if (route.children) {
      const result = matchRoutes(route.children, pathname)
      if (result.length) {
        const match = {
          params: {},
          pathname,
          route,
        }
        return [match, ...result]
      }
    }
  }

  return []
}
