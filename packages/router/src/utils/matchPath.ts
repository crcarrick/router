import { match } from 'path-to-regexp'

import type { PathParams, PathMatch } from '../types.js'

export type MatchOptions = typeof match extends (
  path: string,
  options: infer O,
) => any
  ? O
  : never

export function matchPath<T extends string>(
  path: T,
  pathname: string,
): PathMatch<T> | null {
  const matcher = match<PathParams<T>>(path)
  const matched = matcher(pathname)
  if (matched === false) {
    return null
  }

  return {
    params: matched.params,
    pathname,
    pattern: {
      path,
      matcher,
    },
  }
}
