import { Render } from '../components/Render.js'
import type { Route } from '../types.js'

export function renderMatches(route: Route) {
  return <Render route={route} />
}
