import type { Route } from '../types.js'

export function matchRoutes(routes: Route[], pathname: string): Route | null {
  for (const route of routes) {
    const matched = route.matcher(pathname)
    if (matched) {
      return {
        ...route,
        children: [],
      }
    }

    if (route.children) {
      const result = matchRoutes(route.children, pathname)
      if (result) {
        return {
          ...route,
          children: [result],
        }
      }
    }
  }

  return null
}
