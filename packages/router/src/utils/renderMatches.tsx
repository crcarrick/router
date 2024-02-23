import { Render } from '../components/Render.js'
import type { Route } from '../types.js'

export function renderMatches<T extends string>(route: Route<T>) {
  return <Render route={route} />
}
