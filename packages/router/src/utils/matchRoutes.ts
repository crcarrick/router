import { match } from 'path-to-regexp'

import type { Route } from '../types.js'

function join(...paths: string[]) {
  return paths.join('/').replace(/\/+/g, '/')
}

export function matchRoutes<T extends string>(
  routes: Route<T>[],
  pathname: string,
  previous = '',
): Route<T> | null {
  for (const route of routes) {
    const current = join(previous, route.path)
    const matched = match(current)(pathname)
    if (matched) {
      return {
        ...route,
        full: current,
        children: [],
      }
    }

    if (route.children) {
      const result = matchRoutes(route.children, pathname, current)
      if (result) {
        return {
          ...route,
          full: current,
          children: [result],
        }
      }
    }
  }

  return null
}
