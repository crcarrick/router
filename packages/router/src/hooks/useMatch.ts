import { matchPath } from '../utils/matchPath.js'

import { useLocation } from './useLocation.js'

export function useMatch<T extends string>(path: T) {
  return matchPath(path, useLocation().pathname)
}
