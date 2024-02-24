import { Render } from '../components/Render.js'
import type { RouteMatch } from '../types.js'

export function renderMatches(matches: RouteMatch[]) {
  const match = matches[0]

  if (!match) return null

  return <Render match={match} matches={matches} />
}
