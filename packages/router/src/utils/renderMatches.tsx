import { match } from 'path-to-regexp'

import { Render } from '../components/Render.js'
import type { PathParams, Route } from '../types.js'

import { invariant } from './invariant.js'

export function renderMatches<T extends string>(
  route: Route<T>,
  pathname: string,
) {
  const matched = match<PathParams<T>>(route.full, { end: false })(pathname)

  invariant(matched, `No match found for path: ${pathname}`)

  return <Render route={route} params={matched.params} />
}
