import type { Route, RouteMatch } from '../types.js'

import { matchPath } from './matchPath.js'

export function matchRoutes(routes: Route[], pathname: string): RouteMatch[] {
  // sorting index routes to the end so they only match if no
  // other route matches.  this feels hacky
  const sorted = routes.sort((a, b) => {
    if (a.index && !b.index) {
      return 1
    }
    if (b.index && !a.index) {
      return -1
    }
    return 0
  })

  for (const route of sorted) {
    const pathMatch = matchPath(route.full, pathname)
    if (pathMatch !== null) {
      const index = route.children.find(({ index }) => index === true)
      const match = {
        params: pathMatch.params,
        pathname: pathMatch.pathname,
        route,
      }

      return index
        ? [match, { params: {}, pathname: '', route: index }]
        : [match]
    }
    if (route.children.length > 0) {
      const childMatches = matchRoutes(route.children, pathname)
      if (childMatches.length > 0) {
        return [
          {
            params: {},
            pathname,
            route,
          },
          ...childMatches,
        ]
      }
    }
  }

  return []
}
