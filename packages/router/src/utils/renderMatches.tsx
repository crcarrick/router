import { match } from 'path-to-regexp'

import { RouteRenderer } from '../components/RouteRenderer.js'
import type { PathParams, Route } from '../types.js'

import { invariant } from './invariant.js'

export function renderMatches<T extends string>(
  route: Route<T>,
  pathname: string,
) {
  const matched = match<PathParams<T>>(route.full, { end: false })(pathname)

  invariant(matched, `No match found for path: ${pathname}`)

  return <RouteRenderer route={route} params={matched.params} />
}
