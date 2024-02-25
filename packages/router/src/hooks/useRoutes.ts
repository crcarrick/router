import type { Route } from '../types.js'
import { matchRoutes } from '../utils/matchRoutes.js'
import { renderMatches } from '../utils/renderMatches.js'

import { useLocation } from './useLocation.js'

export function useRoutes(routes: Route[]) {
  const location = useLocation()

  return renderMatches(matchRoutes(routes, location.pathname))
}
